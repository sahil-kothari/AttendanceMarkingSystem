import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from "react-router-dom";

const StudentRegister = () =>{
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") === null){
      navigate("/");
    }
  },[]);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("John Doe");
  const [roll, setRoll] = useState("11111");
  const [branch, setBranch] = useState("IT");
  const [regId, setRegId] = useState("A1A12121212");
  const [year, setYear] = useState("1");
  const [email, setEmail] = useState("johndoe@john.com");
  const [division, setDivision] = useState("1");
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState({name:"", roll:"", regId:"", year:"", email:"", division:""});
  
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then((stream) => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play().then(() => {
        console.log("Playing video");
      }).catch((error) => {
        console.log('Error playing video:', error);
      });
    }).catch((error) => {
      console.log('Error accessing camera:', error);
    });
  }

  const captureImage = () => {
    const width = 800;
    const height = 620;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    return canvas.toDataURL();
  };

  const addPicture = () => {
    const newPictures = [...pictures, captureImage()];
    setPictures(newPictures);
  };

  const deletePicture = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  const submitData = () => {
    name === "" && setErrors({...errors,name: "This field is required"})
    roll === "" && setErrors({...errors,roll: "This field is required"})
    regId === "" && setErrors({...errors,regId: "This field is required"})
    !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) && setErrors({...errors,email: "Invalid email address"})
    email === "" && setErrors({...errors,email: "This field is required"})
    setIsLoading(true)
    axios.post("http://localhost:5000/admin/register",{
      "name":name,
      "roll":roll,
      "branch":branch,
      "regId":regId,
      "year":year,
      "email":email,
      "division":division,
      "imgs":pictures
    }).then((res)=>{
      console.log(res)
      setName("")
      setRoll("")
      setBranch("")
      setRegId("")
      setYear("")
      setEmail("")
      setDivision("")
      setPictures([])
      // if(res.status==200){
      //   alert("Student data already present !!")
      // }
      // else{

      //   alert("Student data registered successfully !!")
      // }
      setIsLoading(false)

      // axios.post("https://localhost:5000/admin/addstudent",res)
    }).catch((res)=>{
      console.log("nahi hua")
      alert("Student registeration failed !!")
      setIsLoading(false)
    })
  };

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    <div className="App">
      {/* {isLoading && <Loader/>} */}
    <Typography variant="h4">Student Information</Typography>
    <br/>
      <form>
        <TextField
          error = {errors.name}
          style={{ width: "400px", margin: "5px" }}
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          type="text"
          label="Name"
          variant="outlined"
          required
          helperText = {errors.name}
        />
        <br />
        <TextField
          error = {errors.roll}
          style={{ width: "400px", margin: "5px" }}
          value={roll}
          onChange={(e)=>{setRoll(e.target.value)}}
          type="text"
          label="Roll"
          variant="outlined"
          required
          helperText = {errors.roll}
        />

        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={branch}
          onChange={(e)=>{setBranch(e.target.value)}}
          type="text"
          label="Branch"
          variant="outlined"
        />
        <br />
        <TextField
          required
          error = {errors.regId}
          style={{ width: "400px", margin: "5px" }}
          value={regId}
          onChange={(e)=>{setRegId(e.target.value)}}
          type="text"
          label="RegId"
          variant="outlined"
          helperText = {errors.regId}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={year}
          onChange={(e)=>{setYear(e.target.value)}}
          type="text"
          label="Year"
          variant="outlined"
        />
        <br />
        <TextField
          error = {errors.email}
          style={{ width: "400px", margin: "5px" }}
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          type="text"
          label="Email"
          variant="outlined"
          helperText = {errors.email}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={division}
          onChange={(e)=>{setDivision(e.target.value)}}
          type="text"
          label="Division"
          variant="outlined"
        />
        <br />
      </form>
    <div style={{ width: "400px", display: "flex", flexDirection: "column" }}>
      <video className='container' ref={videoRef}></video>
      <br />
      <canvas id="canvas" ref={photoRef}></canvas>
      <br />
      <Button onClick={addPicture} variant="contained" style={{ width: "400px" }} color="primary">
        Add Picture
      </Button>
    </div>
    <Grid container spacing={2} style={{ width: "400px", margin: "20px auto 0" }}>
      {pictures.map((picture, index) => (
        <Grid item key={index} xs={6}>
          <Paper style={{ position: "relative", width: "100%", padding: "8px" }}>
            <img src={picture} alt={`Picture ${index}`} width="100%" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            <IconButton 
                aria-label="delete" 
                onClick={() => deletePicture(index)} 
                style={{
                    position: "absolute", 
                    top: 0, 
                    right: 0,
                    backgroundColor: "red", // Change the background color to red
                    color: "white", // Change the text color to white
                    borderRadius: "50%", // Make it circular
                    padding: "5px" // Add some padding
                }}
                >
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <br />
    <Button onClick={submitData} disabled={isLoading} variant="contained" style={{ width: "400px" }} color="primary">
      {isLoading ? "Loading...." : "Submit"}
      {/* Submit */}
    </Button>
    <br />
  </div>
  );
}

export default StudentRegister;