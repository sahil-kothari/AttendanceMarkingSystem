const mongoose = require('mongoose')

const Student = mongoose.Schema({
    name: String,
    email: String,
    regId: String,
    branch: String,
    division: String,
    year: String,
    facial_feature:[Array],
    roll:String
});

module.exports = mongoose.model('Student', Student);