const express = require("express");
const router = express.Router();
const Admin = require("../schemas/admin")
const timetable = require("../schemas/timetable");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const fs = require("fs");
const { spawn } = require("child_process");
const student = require("../schemas/student");
const path = require('path');

router.post(
    "/login",
    async (req, res) => {
        try{
            
            let admin = await Admin.findOne({email: req.body.email});
            console.log(admin)
            if(!admin){
                
                res.status(400).send("Wrong Email");    
            }
            else{
                
                // const us_pass=await bcrypt.hash("qwerty",10)
                // console.log(us_pass)
                const isMatch = await bcrypt.compare(req.body.password,admin.password)
                
                if(!isMatch){
                    
                    res.status(400).send("Wrong Password");
                }
                jwt.sign({admin:admin.email},"teddybear",{expiresIn:360},(err,token)=>{
                    res.status(200).json({
                        token
                    })
                    console.log(err)
                })
            }
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

const tempFolderPath = '/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/temp';
const deleteAllFilesInFolder =async (folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);

            // Iterate through each file and delete it
            files.forEach((file) => {
                const filePath = path.join(folderPath, file);
                fs.unlinkSync(filePath);
                console.log(`${filePath} deleted`);
            });

            console.log('All files deleted from folder:', folderPath);
      } catch (error) {
        console.error('Error deleting files:', error);
      }
  };


router.post(
    "/addstudent",
    async (req, res) => {
        try {
            console.log("Add Student Route");
            const isPresent = await student.findOne({ regId: req.body.regId });
            console.log(isPresent);
            if (isPresent) {
              res.status(200).send("Entry Already Present");
            } else {
              const StudentData = req.body;
              student
                .create(StudentData)
                .then((doc) => {
                  res.status(201).send(doc);
                  console.log("you are in success");
                  deleteAllFilesInFolder(tempFolderPath);
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({
                    message: "DB error",
                  });
                  console.log("you are in fail");
                });
            }
          } catch (e) {
            console.error("error", e);
            res.status(500).json({
              message: "Server Error",
            });
          }
    }
);

router.get('/getstudents',async(req,res)=>{

    try{
        console.log("getting")
        student.find().then((doc)=>{
            res.send(doc);
        }).catch(()=>{
            res.send("eRror");
        });
    }catch(e){res.send("error")};

})

router.post("/register", async (req, res) => {
    try {
      console.log("lol");
    //   console.log(req.body);
  
      const pictures = req.body.imgs;
      const tempDir = `/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/temp`;
  
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      var picCount=0;
      
      await pictures.map(async (picture, index) => {
    //   pictures.map(async (picture, index) => {
        const bimage = picture.split(",")[1];
        const buffer = Buffer.from(bimage, "base64");
        const filename = `image_${index}.jpg`;
        const filepath = `${tempDir}/${filename}`;
        fs.writeFileSync(filepath, buffer);
        picCount+=1;
        console.log(`after picture promises`)
  
      });
    //   alert("Photos captured !!")
    console.log("Photos captured !!")
      const pythonProcess=await spawn("python", [
        "/Users/sahil/Desktop/AttendanceMarkingSystem/Backend/register2.py",
      req.body.name,
      req.body.email,
      req.body.regId,
      req.body.branch,
      req.body.division,
      req.body.year,
      req.body.roll,
      picCount
    ]);

    pythonProcess.stdout.on('data', (data) => {
                        console.log("aya")
                        if(data == 1){
                            console.log("aya111")
                            res.send({
                                success: true
                            })
                        }else{                    
                            console.log("aya2222")
                            res.status(500).json({
                                message: "Capture in better lighting"
                            });
                        }
                    },(error) => {
                        console.log(error)
                    });
  
      
    } catch (e) {
      console.error("error", e);
      res.status(500).json({
        message: "Server Error",
      });
    } 
    
  }
);

router.get("/gettimetable",
    async(req,res)=>{
        try{
            console.log("getting")
            timetable.find().then((doc)=>{
                res.send(doc);
            }).catch(()=>{
                res.send("eRror");
            });
        }catch(e){res.send("error")};
})

router.post(
    "/addtimetable",
    async (req, res) => {
        try{
            console.log("Add Timetable Route")
            const isPresent = await timetable.findOne({day: req.body.day});
            console.log(isPresent)
            if(isPresent){
                await timetable.deleteOne({day: req.body.day})
                .catch((error)=>{
                    console.log(error)
                    res.status(500).json({
                    message: "DB error"
                })}); 
                timetable.insertMany(req.body).then((doc) => {
                    res.status(201).send(doc)
                }).catch((error)=>{
                    console.log(error)
                    res.status(500).json({
                    message: "DB error"
                })})
            }
            else{
                timetable.insertMany(req.body).then((doc) => {
                    res.status(201).send(doc)
                })
                .catch((error)=>{
                    console.log(error)
                    res.status(500).json({
                    message: "DB error"
                })});
            }
        } catch (e) {
            console.error("error",e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;