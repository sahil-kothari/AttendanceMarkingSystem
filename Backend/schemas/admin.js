const mongoose = require('mongoose')

const Admin = mongoose.Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('admin', Admin);