require('dotenv').config();
const express = require('express');
const cors = require('cors');
const items = require('./routes/items');

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use('/api/items', items);
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
});