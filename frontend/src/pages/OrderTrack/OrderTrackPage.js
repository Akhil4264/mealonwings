import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trackOrderById,endRun,changeLoc } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import classes from './orderTrackPage.module.css';
import DateTime from '../../components/DateTime/DateTime';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';

export default function OrderTrackPage() {
  const [order, setOrder] = useState();
  const [companyLoc, setCompanyLoc] = useState({})
  ; // Default starting location
  const [distance, setDistance] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    trackOrderById(orderId).then((fetchedOrder) => {
      // console.log(fetchedOrder)
      setOrder(fetchedOrder);
      setCompanyLoc(fetchedOrder.routerLocation)
      if (fetchedOrder && ! fetchedOrder.isDelivered) updateLocation(fetchedOrder.addressLatLng,fetchedOrder.routerLocation);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  function updateLocation(orderLoc,routerLoc) {
    let compLoc = routerLoc;
    let c = true;

  
    async function move() {
      if (!c) return;
  
      let speed = 5;

      orderLoc.lat = parseFloat(orderLoc.lat)
      orderLoc.lng = parseFloat(orderLoc.lng)

      compLoc.lng = parseFloat(compLoc.lng)
      compLoc.lat = parseFloat(compLoc.lat)
      
      const directionLat = orderLoc.lat > compLoc.lat ? 1 : -1;
      const directionLng = orderLoc.lng > compLoc.lng ? 1 : -1;
      const distanceLat = Math.abs(orderLoc.lat - compLoc.lat);
      const distanceLng = Math.abs(orderLoc.lng - compLoc.lng);
      
      compLoc.lat = (parseFloat(compLoc.lat) + directionLat * speed * (distanceLat / (distanceLat + distanceLng))).toFixed(4);
      compLoc.lng = (parseFloat(compLoc.lng) + directionLng * speed * (distanceLng / (distanceLat + distanceLng))).toFixed(4);
      if ((directionLat === 1 && compLoc.lat >= orderLoc.lat) || (directionLat === -1 && compLoc.lat <= orderLoc.lat)) {
        compLoc.lat = orderLoc.lat;
      }
      if ((directionLng === 1 && compLoc.lng >= orderLoc.lng) || (directionLng === -1 && compLoc.lng <= orderLoc.lng)) {
        compLoc.lng = orderLoc.lng;
      }
      if(compLoc.lat === "NaN" || compLoc.lng === "NaN"){
        compLoc = orderLoc 
        c = false
      }

      compLoc.lat = compLoc.lat.toString()
      compLoc.lng = compLoc.lng.toString()

      setCompanyLoc(compLoc);
      console.log(companyLoc)

      await changeLoc(compLoc,order)
      
      
      if (compLoc.lat === orderLoc.lat && compLoc.lng === orderLoc.lng) {
        c = false;        
        const data = await endRun(order)
        console.log(data)
        console.log("Reached destination");
      }
      
      
      if (c && compLoc.lat !== "NaN" && compLoc.lng !== "NaN") {
        setTimeout(move, 2000);
      }
    }

    move();

    
  
    
  }
  

  


  if (!orderId) {
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;
  }

  return (

    order ? (
      
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
            <strong>Date</strong>
            {/* <DateTime date={order.createdAt} /> */}
            {order.createdAt}
            <strong>Name</strong>
            {order.name}
            <strong>Address</strong>
            {order.address}
            <strong>State</strong>
            {order.status}
          </div>
          {order.isDelivered && <div style={{color : "green"}} >Order isDelivered</div>}
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} companyLoc={companyLoc} readonly={true} distance={distance} setDistance={setDistance} track={true} />
        </div>
        {order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to="/payment">Go To Payment</Link>
          </div>
        )}
      </div>

    ) : <NotFound message="Loading order details..." />
  );
}
