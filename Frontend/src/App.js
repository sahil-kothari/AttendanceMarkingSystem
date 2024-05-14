import './App.css';
import StudentRegister from './pages/StudentRegister';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import { Button } from '@material-ui/core';

function App() {
  const navigate = useNavigate()
  return(
    <>
      <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Button onClick={()=>{navigate("/register")}} style={{fontSize:25}} color='primary' variant='contained' fullWidth >Student Registration</Button>
          <Button onClick={()=>{navigate("/timetable")}} style={{fontSize:25}} color='secondary' variant='contained' fullWidth >Timetable</Button>
      </div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<StudentRegister/>} />
        <Route path="/timetable" element={<Timetable/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App;
