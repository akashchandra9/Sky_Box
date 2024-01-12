import React, { useContext } from 'react';
import {useNavigate} from "react-router-dom"
import './login.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../UserContext';
import { Navigate } from "react-router-dom";
const Login = () => {

  
const navigate = useNavigate();

const { setUserInfo } = useContext(UserContext);
const[backenddata,setbackenddata]=useState([])
const [redirect, setRedirect] = useState(false);
  const[email,setemail]=useState('')
  const[password,setpass]=useState('')
  async function senddata(ev) {
    // console.log("hello");
    ev.preventDefault();
    const response = await fetch(process.env.React_App_Host_Api+"/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast("success");
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      toast("wrong credentials");
    }
  }
  if (redirect) {
    return <Navigate to={"/updo"} />;
  }
	
return (
	<>
     {/* <p>{process.env.React_App_Host_Api}</p> */}
		
    <div className="App">

  <div className='form2'>
    <form>
  <label for="Email"><b>Email:</b></label>
  <input type="text" id="email" placeholder='Email' value={email} onChange={(ev)=>{setemail(ev.target.value)}} /><br></br>
  <label for="password"><b>Password:</b></label>
  <input type="password" id="password" placeholder='Password' value={password} onChange={(ev)=>{setpass(ev.target.value)}} /><br></br>
  </form>
  <br></br>
  <button className='log' onClick={senddata} ><b>Login</b></button>
  <ToastContainer />
  
  
  {/* {backenddata === 'success' && navigate('/updo',{ state: { username: username } }) } */}
  <br></br>
  <a href='/register'>Register</a><br></br>
  {/* <a href='/forget?'>Forget password</a> */}
  </div>
  </div>
    

	</>
)
};

export default Login;
