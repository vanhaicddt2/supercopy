const mongoose = require('mongoose');

require('dotenv').config();

const {
    MONGODB_URL,
    MONGODB_URL_USER
} = process.env;

if (!MONGODB_URL || !MONGODB_URL_USER) {
    throw new Error('Thiếu MONGODB_URL hoặc MONGODB_URL_USER trong file .env');
}

const connectionOptions = {
    serverSelectionTimeoutMS: 10000
};

mongoose.set("strictQuery", false);

mongoose.connect(MONGODB_URL, connectionOptions).then(() => {
    console.log("Connect to mongodb");
}).catch(error => {
    console.error("Error Mongodb:", error.message);
});

mongoose.user = mongoose.createConnection(MONGODB_URL_USER, connectionOptions);
mongoose.user.on('connected', () => {
    console.log("Connect to user mongodb");
});
mongoose.user.on('error', error => {
    console.error("Error user mongodb:", error.message);
});

module.exports = mongoose;
