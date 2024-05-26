import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import { OrderModel } from './models/order.model.js';
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


app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
