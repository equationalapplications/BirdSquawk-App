const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express ();
app.use(express.json());
app.use(cors());

const BirdSquawkData = {};

app.get('/birdsquawks', (req, res) => {
    res.send(BirdSquawkData);
});

app.post('/birdsquawks', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    BirdSquawkData[id] = {
        id, title
    };
    res.status(201).send(BirdSquawkData[id]);
});

app.listen(5000, () => {
    console.log('BirdSquawk-Service listening on port 5000')
});