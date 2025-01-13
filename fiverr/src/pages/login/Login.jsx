import React, { useState } from 'react'
import './Login.scss';
import {Link, useNavigate} from "react-router-dom"
import newRequest from '../../utils/newRequest';
import IMG from "../../fiverr_Assets/loginPageImg.webp";

const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(null);
const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", {username, password});
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");

    } catch (error) {
      // setError(error.message);
      setError(error.message);

    }
  }




  return (



    <div className='login'>
    <div className="loginImgDiv">
    <img src={IMG} alt="loginImg" className='loginImg'/>
    </div>
    
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className='signIn'>Sign In</h1>
        <input type="text" name='username' value={username}  placeholder='UserName' onChange={(e) => setUsername(e.target.value)} />
        
        <input type="password" name='password' value={password}  placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>

        <p className='signInpara'>Don&apos;t have an account <Link to="/register">   <span className='join'>Join Now</span></Link></p>

        <button type='submit'>Sign In</button>
       <span className='error'>{error}</span> 

      </form>
    </div>
      
    </div>
  )
}

export default Login
