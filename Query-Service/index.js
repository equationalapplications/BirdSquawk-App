const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/birdsquawks', (req, res) => {

});

app.post('/messageque', (req, res) => {

});

app.listen(5200, () => {
    console.log('Query-Service listening on port 5200')
});