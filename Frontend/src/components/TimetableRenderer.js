import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react';
import Subjects from './Subjects'
import TimeRange from './TimeRange'
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


const Timetable = ({division}) =>{
    const [isPublishing,setIsPublishing] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
        navigate("/")
      }
    },[])
    const [timeTable,setTimeTable] = useState({slots:[],subjects:{}})
    const Days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const PostTimeTable = () => {
        console.log("Posting tt")
        axios
        .post("http://localhost:5000/admin/addtimetable", {
            slots: timeTable.slots,
            subjects: timeTable.subjects
        },{
          headers:{
            "token":localStorage.getItem('token')
          }
        })  
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const HandleAdd = () => {
        setTimeTable((prev)=>{
          let newTimeTable = {...prev}
          newTimeTable.slots.push(["",""])
          Days.forEach((day) => {
            newTimeTable.subjects[day].push(day)
          });
          return newTimeTable
        })
    };
    const HandleDelete = () => {
      setTimeTable((prev)=>{
        let newTimeTable = {...prev}
        newTimeTable.slots.pop()
        Days.forEach((day) => {
          newTimeTable.subjects[day].pop()
        });
        return newTimeTable
      })
    };
    useEffect(() => {
        axios
        .get("http://localhost:5000/admin/gettimetable",{
          headers:{
            "token":localStorage.getItem('token')
          }
        })
        .then((res) => {
          setTimeTable((prev)=>{
            let newTimeTable = {...prev}
            newTimeTable.slots = res.data[0].slots
            Days.forEach((day) => {
              newTimeTable.subjects = res.data[0].subjects;
            });
            return newTimeTable
          })
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem("token")
            navigate("/")
        });
        // eslint-disable-next-line 
    }, []);

    return (
        <div className="App">
          <br/>
          <div style={{overflowX:'auto'}}>
            <table>
              <tbody>
                <tr>
                  {timeTable?.slots.map(([start, end], i) => {
                    return (
                      <th key={i}>
                        <TimeRange
                          setTimeTable={setTimeTable}
                          index={i}
                          start={start}
                          end={end}
                        />
                      </th>
                    );
                  })}
                </tr>
                {Days.map((day) => {
                  return (
                    <tr key={day}>
                      <Subjects
                        timeTable={timeTable}
                        day={day}
                        setTimeTable={setTimeTable}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{display:"flex",width:"100%",justifyContent:"center"}} >
            <Button variant="contained" color="primary" style={{width:"200px",margin:"10px"}}  onClick={PostTimeTable}>
              {isPublishing ? "Publishing":"Publish Timetable"}
            </Button>
            <Button variant="contained" color="primary" style={{width:"200px",margin:"10px",fontSize:50}}  onClick={HandleAdd}> + </Button>
            <Button variant="contained" color="secondary" style={{width:"200px",margin:"10px",fontSize:50}}  onClick={HandleDelete}> - </Button>
          </div>
        </div>
      );
}

export default Timetable;