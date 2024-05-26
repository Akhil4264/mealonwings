import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { UNAUTHORIZED,BAD_REQUEST } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = Math.floor(Math.random()*10000000);
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send('Order Not Found!');
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();


    res.send(order._id);
  })
);

router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    console.log(user)

    let order;
    if (user.role === "Customer") {
      filter.user = user._id;
      order = await OrderModel.findOne(filter);
    }
    else if(user.role === "Employee"){
      order = await OrderModel.findOne(filter)
    }

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);

router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    console.log(req.user.id)
    const order = await getNewOrderForCurrentUser(req);
    if (order) return res.send(order);
    else res.status(BAD_REQUEST).send("no order found");
  })
);

router.get('/allstatus', (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  '/all',
  handler(async (req, res) => {
    const orders = await OrderModel.find({}).sort('-createdAt');
    res.send(orders);
  })
);

router.post(
  '/endrun',
  handler(async (req, res) => {
    const order = req.body;

    const thisOrder = await OrderModel.findOne({
      order
    });

    thisOrder.isDelivered  = true
    await thisOrder.save();
    res.send(thisOrder);
  })
);


router.post(
  '/changeLoc',
  handler(async (req, res) => {
    const order = req.body.order;
    const compLoc = req.body.compLoc

    const thisOrder = await OrderModel.findOne({
      order
    });

    thisOrder.routerLocation = compLoc
    await thisOrder.save();
    res.send(thisOrder);
  })
);

const getNewOrderForCurrentUser = async req =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  }).populate('user');
export default router;
