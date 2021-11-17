import express, { Request, Response } from 'express';
import { Mongoose } from 'mongoose';
const amqp = require("amqplib");
import PeepModel from '../models/peep';

const { randomBytes } = require("crypto");

const router = express.Router();

router.get('/api/peeps/:squawkId', (req: Request, res: Response) => {
    const squawkId = req.params.squawkId;
    PeepModel.find({ squawkId: squawkId }, (err, peeps) => {
        if (err) {
            res.status(500).send(err);
        } else {

            res.status(200).send(peeps);
        }
    });
});
 
    router.post('/api/peeps/:squawkId', async (req: Request, res: Response) => {
        const { peep } = req.body;
        const peepId = randomBytes(4).toString("hex");
        const squawkId = req.params.squawkId;
        const peepData = { peep: peep, peepId: peepId};
        const msg = { peep: peep, peepId: peepId, squawkId: squawkId };
        
        try {
            await PeepModel.updateOne({ squawkId: squawkId }, { $push: { peeps: peepData } });
            console.log(`Peep ${peepId} saved to squawk ${squawkId}`);

            const amqpConnection = await amqp.connect("amqp://rabbitmq-service:5672");
            console.log("Peeps API connected to RabbitMQ");
            const channel = await amqpConnection.createChannel();
            await channel.assertExchange("birdsquawk-exchange", "topic", { durable: false });
            console.log("Exchange created");
            await channel.publish("birdsquawk-exchange", "peep", Buffer.from(JSON.stringify(msg)));
            console.log("Peep published to RabbitMQ");
            res.status(201).send(peepData);

        } catch (err) {
            res.status(500).send("error " + err);
        }
    });

    export { router };