const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const customerRoutes = require('./routes/customers'),
      userRouts = require('./routes/users');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
});

//instantiate Express
const app = express();

//middleware that handles user input before it can be routed
app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/api/v1/admin', customerRoutes);
app.use('/api/v1/users', userRouts);


const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running!');
});