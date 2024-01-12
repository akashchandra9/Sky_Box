import React, { useEffect, useContext, useState } from "react";
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from './UserContext';
const Updo = () => {
  useEffect(() => {
    fetch(process.env.React_App_Host_Api+"/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const { setUserInfo, userInfo } = useContext(UserContext);
const navigate = useNavigate();
  const usermail=userInfo.email;
    function upload(){
        navigate('/detail')
    }
    function download(){
        navigate('/down')
    }
    function logout(){
      fetch(process.env.React_App_Host_Api+"/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo("");
    toast("success");
      navigate('/login')
      
  }

return (
	<>
    

<p>Hello  {!usermail && <p>Please Login</p>} {usermail} {usermail && <a className="logout-link" onClick={logout}>Logout</a>}</p>

<ToastContainer />

 
 

  <button className='upbutton' onClick={upload}><b>Upload</b></button>
  <br></br><br></br>
  <button className='downbutton' onClick={download}><b>Download</b></button>
  
	</>
)
};

export default Updo;
