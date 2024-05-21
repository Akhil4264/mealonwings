import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { pay } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'AUWcnaHjOUoXVI3IjLpMkM0Kk0Sigq1CUAWP-finHI950yQD2Qni8XPkRbs76Q-_JIT8hJFhKD8YVy3u',
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: order.totalPrice,
  //         },
  //       },
  //     ],
  //   });
  // };

  const onApprove = async () => {
    try {
      pay(order)
      clearCart();
      toast.success('Payment Saved Successfully', 'Success');
      navigate('/track/' + order._id);
    } catch (error) {
      toast.error('Payment Save Failed', 'Error');
    }
  };

  const onError = err => {
    toast.error('Payment Failed', 'Error');
  };

  return (
    // <PayPalButtons
    //   createOrder={createOrder}
    //   onApprove={onApprove}
    //   onError={onError}
    // />
    <div className="container">
  <div className="container">
    <form className="form-control" onSubmit={onApprove}>
      <div>
        <label htmlFor="cardNumber" className="form-label">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" required />
      </div>
      <div>
        <label htmlFor="cardholderName" className="form-label">Cardholder Name:</label>
        <input type="text" id="cardholderName" name="cardholderName" required />
      </div>
      <div>
        <label htmlFor="cvv" className="form-label">CVV:</label>
        <input type="text" id="cvv" name="cvv" required />
      </div>
      <div>
        <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
        <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
      </div>
      <div>
        <label htmlFor="billingAddress" className="form-label">Billing Address:</label>
        <input type="text" id="billingAddress" name="billingAddress" required />
      </div>

      <button type="submit">Pay Now</button>
    </form>
  </div>
</div>



  );
}
