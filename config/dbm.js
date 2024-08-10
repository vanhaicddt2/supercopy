const mongoose = require('mongoose');

require('dotenv').config();

const {
    MONGODB_URL,
    MONGODB_URL_USER
} = process.env;

const confirmMongoose = {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

mongoose.connect(MONGODB_URL, confirmMongoose,).then((res) => {
    console.log("Connect to mongodb")
  }).catch(error => {
     console.log("Error Mongodb:", error);
   });

mongoose.user = mongoose.createConnection(MONGODB_URL_USER, confirmMongoose);

module.exports = mongoose;
