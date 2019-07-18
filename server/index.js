const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config'); //import index.js
const FakeDb = require('./fake-db');

//deploy
const path = require('path');

const customerRoutes = require('./routes/customers'),
      userRouts = require('./routes/users');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
    // fakeDb.seedDb();
    }
    
});

//instantiate Express
const app = express();

//middleware that handles user input before it can be routed
app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/api/v1/admin', customerRoutes);
app.use('/api/v1/users', userRouts);

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'dist/isp');
    app.use(express.static(appPath));

    app.get('*', function(req, res){
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
};




const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running!');
});