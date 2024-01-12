import React from 'react';
import {Navigate, useNavigate,useLocation} from "react-router-dom"
import './login.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Pass = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {username}  = location.state;

  const[password,setpass]=useState('')
  const[cpassword,setcpass]=useState('')
  function pass(){ 

    var user = {
      username:username,
      password:password,
      cpassword:cpassword
    }
    axios.post('/api/pass',user)
    .then(res=>{
      console.log(res)
        
      toast.info(res.data)
      
      if(res.data=='Password updated'){
        toast.info(res.data)
        navigate('/login')
      }
      


      });

  }


	
return (
	<>
  
		
   

  <div className='form2'>
    <form>
  <label for="password"><b>New Password:</b></label>
  <input type="password" id="username" placeholder='new password' value={password} onChange={(e)=>{setpass(e.target.value)}} /><br></br>
  
  <label for="cpassword"><b>Confirm New Password:</b></label>
  <input type="password" id="otp" placeholder='confirm new password' value={cpassword} onChange={(e)=>{setcpass(e.target.value)}} /><br></br>
  </form>
  <button className='log' onClick={pass} ><b>Confirm</b></button>

  <ToastContainer />
  
  
 
  
  </div>
	</>
)
};

export default Pass;
