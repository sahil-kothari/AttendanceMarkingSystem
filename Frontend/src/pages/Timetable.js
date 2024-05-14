import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TimeTableRender from '../components/TimetableRenderer' 

const Timetable = () =>{

  return (
    <div className="App">
      {/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Division</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={currDivision}
          onChange={(e)=>{setCurrDivision(e.target.value)}}
        >
          {DIVISIONS.map((division)=>{
            return (<MenuItem value={division}>{division}</MenuItem>)
          })}
        </Select>
      </FormControl> */}
      {/* <TimeTableRender/> */}
    </div>
  );
}

export default Timetable;