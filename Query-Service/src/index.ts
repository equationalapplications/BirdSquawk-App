import express from 'express';
import mongoose from 'mongoose';
const amqp = require("amqplib");
import QueryModel from './models/query';

import { router } from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

async function processPeepMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { peep, peepId, squawkId } = content;
  console.log(peep, peepId, squawkId);
  const peepData = { peep: peep, peepId: peepId};
  await mongoose.model('Query').updateOne({ squawkId: squawkId }, { $push: { peeps: peepData } });
  console.log("Saved peep to DB");
};


async function processSquawkMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { squawk, squawkId } = content;
  console.log(squawk, squawkId);

  const queryData = {
    squawk: squawk,
    squawkId: squawkId,
    peeps: []
  };
  
  try {
    const newQuery = new QueryModel(queryData);
    await newQuery.save();
    console.log("Saved birdsquawk event to DB");
  } catch (err) {
    console.log(err);
  } 
};

const Startup = async () => {
  try {
    await mongoose.connect('mongodb://query-mongo-service:27017/query');
    console.log('Connected to MongoDB');

    const amqpConnection = await amqp.connect("amqp://rabbitmq-service:5672", "heartbeat=30");
    console.log("Peeps connected to RabbitMQ");
    const channel = await amqpConnection.createChannel();
    await channel.assertExchange("birdsquawk-exchange", "topic", { durable: false });
    console.log("Exchange created");

    await channel.assertQueue("query-peep-queue", { durable: false });
    await channel.bindQueue("query-peep-queue", "birdsquawk-exchange", "peep.#");
    await channel.consume("query-peep-queue", async (msg: { content: { toString: () => any; }; }) => {
      console.log("Processing message");
      await processPeepMessage(msg);
      await channel.ack(msg);
    }, { noAck: false });

    await channel.assertQueue("query-squawk-queue", { durable: false });
    await channel.bindQueue("query-squawk-queue", "birdsquawk-exchange", "squawk.#");
    await channel.consume("query-squawk-queue", async (msg: { content: { toString: () => any; }; }) => {
      console.log("Processing message");
      await processSquawkMessage(msg);
      await channel.ack(msg);
    }, { noAck: false });


  } catch (e) {
    console.log(e);
  }

  app.listen(5200, () => {
    console.log('Query-Service listening on port 5200');
  });
};

Startup();