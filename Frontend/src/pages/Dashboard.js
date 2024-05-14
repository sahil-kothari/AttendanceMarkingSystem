import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Login = () =>{
    const navigate = useNavigate()
    const [students,setStudents] = useState([])
    const [attributes,setAttributes] = useState([])
    const getStudents = () => {
        axios.get("http://localhost:5000/admin/getstudents",{
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then((res)=>{
            let Data = res.data
            Data.forEach((d)=>{
              delete d._id
              delete d.facial_feature
              delete d.__v
            })
            setAttributes(Object.keys(res.data[0]))
            res.data.forEach(student => {
              setStudents(prev => [...prev,Object.values(student)])
            });
        })
    }
    useEffect(()=>{
        getStudents()
    },[])
    if(students){
      return (
          <div className="App">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {attributes.map((attr)=><TableCell align="right">{attr.toUpperCase()}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.name}>
                      {student.map((attr)=><TableCell align="right">{attr}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      )
    }
    else{
      <h1>Loading....</h1>
    }
}

export default Login;