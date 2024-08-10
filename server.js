require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
module.exports = exports = mongoose;

const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
var cron = require('node-cron');
const app = express();
const http = require('http');
const route = require('./router/index')
var bodyParser = require('body-parser');

const axios = require('axios');

const { NODE_ENV} = process.env;

var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: ['application/x-www-form-urlencoded', "application/json"] });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: ['application/x-www-form-urlencoded', "application/json"] })

app.use(jsonParser);
app.use(urlencodedParser);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(fileUpload({ useTempFiles: true }));
// app.use(upload.array());

//Router init
route(app)

app.get('*', function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
});

// note 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});

