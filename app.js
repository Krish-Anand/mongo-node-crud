const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

const postRouts = require('./routes/post');
app.use('/posts', postRouts)

// connect the mongoose database

mongoose.connect(process.env.DB_CONNECTION, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
    else console.log('connected to DB')
    });

app.listen(3000)