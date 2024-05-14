const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const student = require("../schemas/student");
const { spawn } = require("child_process");

router.get(
    "/getencodings",
    async (req, res) => {
        try{
            student.find().then((doc) => {
                let dataToSend = []
                doc.forEach((student)=>[
                    dataToSend.push({regId: student.email, facial_feature: student.facial_feature})
                ])
                // console.log(dataToSend)
                res.send(dataToSend)
            })
            .catch((error)=>{
                console.log(error)
                res.status(500).json({
                message: "DB error"
            })});
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);
//htvp vvoe pypa gyha

router.post(
    "/markattendance",
    async (req, res) => {
        try{
            console.log(JSON.stringify(req.body))
            const pythonProcess1 = spawn('python',["/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/sendmail.py",JSON.stringify(req.body)]);
            pythonProcess1.stdout.on('data', (data) => {
                
                if(data == 1){
                    console.log("Mail sent successfully to these ID's")
                    res.send({
                        success: true
                    })
                }else{                    
                    
                    res.status(500).json({
                        message: "Could not send mail"
                    });
                }
            },(error) => {
                console.log(error)
            });
            
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;