const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Path: router/messages.js
const messagesRoute = require('./router/messages');

const host = 'http://localhost';
const port = 5000;

const app = express();

app.use(
    cors(
        {
            origin: '*'
        }
    )
);

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(
    MONGO_URL
).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (error) => {
        console.log('Error connecting to MongoDB', error);
    }
);

app.listen(port, () => {
    console.log(`Server listening on port ${host}:${port}`);
});


app.use('/api', messagesRoute);

//*** Production Settings */
app.use(express.static('./build'));


