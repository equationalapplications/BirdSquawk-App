import express from 'express';
import mongoose from 'mongoose';
const amqp = require("amqplib");
import PeepModel from './models/peep';

import { router } from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

async function processSquawkMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { squawkId } = content;
  console.log(content);
  console.log(squawkId);

  const peepData = {
    squawkId: squawkId,
    peeps: [],
  };

  try {
    const newPeep = new PeepModel(peepData);
    await newPeep.save();
    console.log("Saved birdsquawk event to DB");
  } catch (err) {
    console.log(err);
  } 
};

const Startup = async () => {
  try {
    await mongoose.connect('mongodb://peep-mongo-service:27017/peep');
    console.log('Connected to MongoDB');

    const amqpConnection = await amqp.connect("amqp://rabbitmq-service:5672", "heartbeat=30");
    console.log("Peeps connected to RabbitMQ");
    const channel = await amqpConnection.createChannel();
    await channel.assertExchange("birdsquawk-exchange", "topic", { durable: false });
    console.log("Exchange created");

    await channel.assertQueue("peeps-squawk-queue", { durable: false });
    await channel.bindQueue("peeps-squawk-queue", "birdsquawk-exchange", "squawk.#");
    await channel.consume("peeps-squawk-queue", async (msg: { content: { toString: () => any; }; }) => {
      console.log("Processing message");
      await processSquawkMessage(msg);
      await channel.ack(msg);
    }, { noAck: false });

  } catch (e) {
    console.log(e);
  }

  app.listen(5100, () => {
    console.log('Peeps-Service listening on port 5100');
  });
};

Startup();