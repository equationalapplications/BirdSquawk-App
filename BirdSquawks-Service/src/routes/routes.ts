import express, { Request, Response } from 'express';
const amqp = require("amqplib");
import BirdSquawkModel from '../models/birdsquawk';
// import event js file

const { randomBytes } = require("crypto");

const router = express.Router();

router.get('/api/birdsquawk/', (req: Request, res: Response) => {
    BirdSquawkModel.find({}, (err, birdsquawk) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json(birdsquawk);
    });
});

router.post('/api/birdsquawk/', async (req: Request, res: Response) => {
    const { squawk } = req.body;
    const squawkId = randomBytes(4).toString("hex");
    const squawkData = { squawk, squawkId };
    try {
        const newBirdsquawk = new BirdSquawkModel(squawkData);
        await newBirdsquawk.save();
        console.log("Saved birdsquawk to DB");

        const amqpConnection = await amqp.connect("amqp://rabbitmq-service:5672");
        console.log("BirdSquawks connected to RabbitMQ");
        const channel = await amqpConnection.createChannel();
        await channel.assertExchange("birdsquawk-exchange", "topic", { durable: false });
        console.log("Exchange created");
        await channel.publish("birdsquawk-exchange", "squawk", Buffer.from(JSON.stringify(squawkData)));
        console.log("Published to RabbitMQ");
        res.status(201).send(squawkData);

    } catch (err) {
        res.status(500).send("error " + err);
    }
});

export { router };