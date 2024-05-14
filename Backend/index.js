const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
require('dotenv').config();
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes =require("./routes/studentRoutes");
const bodyParser = require("body-parser");
const app = express();
const nodeCron = require('node-cron');
const timetable = require("./schemas/timetable");
const {spawn}  = require('child_process')
const uriDb = process.env.DB_URI;

mongoose.connect(
  uriDb,
  { useNewUrlParser: true, useUnifiedTopology: true ,writeConcern: { w: 'majority' }},
  () => {
    console.log("connected to db")
  }
);
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
app.use('/admin', adminRoutes);
app.use('/student',studentRoutes)



function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}




let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log("Listening");
});
