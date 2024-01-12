import React from 'react';
import {Navigate, useNavigate} from "react-router-dom"
import './login.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forget = () => {
const navigate = useNavigate();

const[backenddata,setbackenddata]=useState([])

  const[username,setusername]=useState('')
  const[otp,setotp]=useState('')
  function senddata(){ 
    var passw={
      username:username
      
    }
   

    var user = {
      otp:otp
    }
    axios.post('/api/otp',user)
    .then(res=>{
      console.log(res)
      if(res.data==='correct'){
      toast.success(res.data)
      navigate('/pass', { state: { username: username } });
      }
      else{
        toast.error(res.data)
      }

    }).catch(err=>{
      setbackenddata(err);
      
    })

  }


  function showDiv() {
   
    var user2 = {
        username:username
      }
    
    axios.post('/api/forget',user2)
    .then(res=>{
      console.log(res)
      if(res.data==='no')
      {
        toast.info("Please enter correct username")
      }
      else{
      toast.info('otp send to '+res.data)
      document.getElementById('show').style.display = "inline";}

    }).catch(err=>{
      setbackenddata(err);
      
    })
    
 }
	
return (
	<>
	
    <div className="App">

  <div className='form2'>
    <form>
  <label for="username"><b>Username:</b></label>
  <input type="text" id="username" placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}} /><a href='#' onClick={()=>{showDiv()}}>send otp</a><br></br>
  <div id="show" style={{display:'none'}}>
  <label for="otp"><b>OTP:</b></label>
  <input type="text" id="otp" placeholder='OTP:' value={otp} onChange={(e)=>{setotp(e.target.value)}} /><br></br>
  <button className='log' onClick={senddata} ><b>Proceed</b></button>

  </div>
  </form>
  
  <ToastContainer />
  
  
  </div>
  </div>
    

	</>
)
};

export default Forget;
