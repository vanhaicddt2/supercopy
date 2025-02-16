require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
module.exports = exports = mongoose;

const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
// var cron = require('node-cron');
const app = express();
const http = require('http');
const route = require('./router/index')
var bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");

// const axios = require('axios');

// const { NODE_ENV} = process.env;

// var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: ['application/x-www-form-urlencoded', "application/json"] });
// var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: ['application/x-www-form-urlencoded', "application/json"] })

// app.use(jsonParser);
// app.use(urlencodedParser);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use('/image', express.static(path.join(__dirname, 'image')));

//Router init
route(app)



// Tạo thư mục 'image' nếu chưa tồn tại
const IMAGE_FOLDER = "image";
if (!fs.existsSync(IMAGE_FOLDER)) {
  fs.mkdirSync(IMAGE_FOLDER);
}

// Cấu hình lưu trữ file bằng Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_FOLDER); // Lưu vào thư mục image/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Lấy phần mở rộng của file
    const newFileName = req.params.id + ext; // Đặt tên theo dạng image1.jpg, image2.png,...
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// API upload ảnh
app.post("/upload/:id", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const ext = path.extname(req.file.originalname); 
  res.json({ imageUrl: `/image/${req.file.filename}`, ext });
});

// Cấu hình để truy cập ảnh từ thư mục image/
app.use("/image", express.static(IMAGE_FOLDER));


app.get('*', function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
});

// note 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});