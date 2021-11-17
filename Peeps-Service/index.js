const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const peepsByBirdSquawkId = {};

app.get('/birdsquawks/:id/peeps', (req, res) => {
  res.send(peepsByBirdSquawkId[req.params.id] || []);
});

app.post('/birdsquawks/:id/peeps', (req, res) => {
  const peepsId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const peeps = peepsByBirdSquawkId[req.params.id] || [];

  peeps.push({ id: peepsId, content });

  peepsByBirdSquawkId[req.params.id] = peeps;

  res.status(201).send(peeps);
});

app.listen(5100, () => {
  console.log('Peeps-Service on 5100');
});