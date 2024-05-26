import React, { useState, useEffect } from 'react';
import classes from '../css/pages/paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../services/orderService';
import Title from '../components/Title';
import OrderItemsList from '../components/OrderItemsList';
import { pay } from '../services/orderService';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const [distance,setDistance] = useState(0)
  const compLoc = {
    lat : "20",
    long : "20"
  }
  const [companyLoc,setcompanyLoc] = useState(compLoc);
  

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => {
      console.log(data.addressLatLng)
      setOrder(data);
      setcompanyLoc(compLoc)
      console.log(compLoc)      
    });
  }, []);
  


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

  if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
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
          </div>
        </div>

      </div>
    </>
  );
}
