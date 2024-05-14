import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";


const Login = () =>{
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const login = (e) => {
        axios.post("http://localhost:5000/admin/login",{email,password},{
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then((token)=>{
            localStorage.setItem("token",token.data.token)
            navigate("/register")
        })
    }

    useEffect(()=>{
        if(localStorage.getItem("token") !== null){
            navigate("/register")       
        }
    },[])

    return (
        <div className="App">
            <br/>
            <TextField
                style={{ width: "400px", margin: "5px" }}
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                type="text"
                label="Email"
                variant="outlined"
            />
            <br />
            <TextField
                style={{ width: "400px", margin: "5px" }}
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                label="Password"
                variant="outlined"
            />
            <br/>
            <Button onClick={login}  variant="contained" style={{ width: "400px"}}  color="primary">
                Submit
            </Button>
        </div>
    )
}

export default Login;