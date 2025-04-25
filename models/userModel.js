const mongoose = require('mongoose');
var conn = require('../config/dbm');

const userSchema = new mongoose.Schema({
    name: {type: String },
    copy1: {type: String, default:"" },
    copy2: {type: String, default:"" },
    copy3: {type: String, default:"" },
    copy4: {type: String, default:"" },
    copy5: {type: String, default:"" },
    copy6: {type: String, default:""  },
    copy7: {type: String,default:""  },
    picture1: {type: String},
}, {
    timestamps: true
});

module.exports = conn.user.model("Users", userSchema);
