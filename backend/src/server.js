import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import { OrderModel } from './models/order.model.js';
import uploadRouter from './routers/upload.router.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http'
import mongoose from 'mongoose'

import { dbconnect } from './config/database.config.js';
import path, { dirname } from 'path';
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// io.on('connection', (socket) => {

//   socket.on("newConn", async (order) => {
//     console.log(order)
//     console.log("socket connected with Id : ", socket.id)
//     const thisOrder = await OrderModel.findOne({ _id: order._id });
//     thisOrder.socketId = socket.id;
//     await thisOrder.save()
//     const speed = 20; // speed per second, adjust based on your scale and units
//     let compLoc = { lat: 20, lng: 20 }; // Starting location of company
//     const orderLoc = order.addressLatLng; // Destination location from order

//     async function updateLocation() {
//       while (true) {
//         const directionLat = orderLoc.lat > compLoc.lat ? 1 : -1;
//         const directionLng = orderLoc.lng > compLoc.lng ? 1 : -1;
//         const distanceLat = Math.abs(orderLoc.lat - compLoc.lat);
//         const distanceLng = Math.abs(orderLoc.lng - compLoc.lng);

//         // Update company's location
//         compLoc.lat += directionLat * speed * (distanceLat / (distanceLat + distanceLng));
//         compLoc.lng += directionLng * speed * (distanceLng / (distanceLat + distanceLng));

//         console.log(compLoc)

//         // Check if the updated location has reached or overtaken the order location
//         if ((directionLat === 1 && compLoc.lat >= orderLoc.lat) || (directionLat === -1 && compLoc.lat <= orderLoc.lat)) {
//           compLoc.lat = orderLoc.lat;
//         }
//         if ((directionLng === 1 && compLoc.lng >= orderLoc.lng) || (directionLng === -1 && compLoc.lng <= orderLoc.lng)) {
//           compLoc.lng = orderLoc.lng;
//         }

//         // Emit the updated location to the client
//         socket.to(socket.id).emit("orderTrack", { newLocation: compLoc });

//         // Check if the company has reached or overtaken the destination
//         if (compLoc.lat === orderLoc.lat && compLoc.lng === orderLoc.lng) {
//           socket.to(socket.id).emit("end", "Order reached the destination.");
//           console.log("reached destination")
//           break; // Stop the loop if the destination is reached
//         }

//         await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before the next update
//       }
//     }

//     updateLocation(); // Start updating location
//   })


// });

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

// app.get('*', (req, res) => {
//   const indexFilePath = path.join(publicFolder, 'index.html');
//   res.sendFile(indexFilePath);
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
