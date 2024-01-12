import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className="navbar">
          <div className="container-left">
      <div className="elements"><Link className='link' to="/">Home</Link></div>
      <div className="elements"><Link className='link' to="/about">Plan</Link></div>
      <div className="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Account</a>
    <div className="dropdown-content">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      {/* <a href="/forget">Forgot Password</a> */}
    </div>
    </div>
   
    </div>
    
    </div>
    </>
  )
}

export default Navbar