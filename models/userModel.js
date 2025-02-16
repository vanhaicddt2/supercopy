const mongoose = require('mongoose');
var conn = require('../config/dbm');

const userSchema = new mongoose.Schema({
    name: {type: String },
    copy1: {type: String },
    copy2: {type: String },
    copy3: {type: String },
    copy4: {type: String },
    copy5: {type: String },
    picture1: {type: String},
}, {
    timestamps: true
});

module.exports = conn.user.model("Users", userSchema);
