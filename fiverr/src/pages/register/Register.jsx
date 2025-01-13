import React, { useState } from 'react'
import './Register.scss';
import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest';
import { useNavigate } from "react-router-dom"; 
import IMG from "../../fiverr_Assets/signUpPageImg.webp";
import IMG1 from "../../fiverr_Assets/SignUpTeam.svg";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });


  const navigate = useNavigate();


  const handleChange = (e) => {
    setUser((perv)=> {
      return{...perv,[e.target.name]: e.target.value};
    })
    
  }
  
  const handleSeller = (e) => {
    setUser((perv)=> {
      return{...perv,"isSeller": e.target.checked };
    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file)
    try {
    const res =  await newRequest.post("/auth/register", {
        ...user,
        img:url,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="register">
    <form onSubmit={handleSubmit}>

      <div className="Account">

      <div className="left">
        <h1>Create a new account</h1>

        <input
          name="username"
          type="text"
          placeholder="User Name"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input name="password" placeholder='Password' type="Password" onChange={handleChange} />
        <label htmlFor="">Profile Picture</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          name="country"
          type="text"
          placeholder="Country"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </div>

    <div className="AccountImg">
      <img src={IMG} alt="AcountImg" width={500}/>
        </div>

      <p>Scroll Down to Become Partner </p>

      </div>

      <div className="seller">

      <div className="AccountImg">
      <img src={IMG1} alt="AcountImg" width={500} height={400}/>
    </div>

    


<div className="right">
        <h1>I want to become a seller</h1>

        <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="sliderr round"></span>
            </label>
          </div>

        {/* <label className="toggle-button-cover">Activate to the seller Account 🤑 <FaDollarSign className='dollar' />
      <div id="button-2" className="button r">
        <input className="checkbox" type="checkbox"  onChange={handleSeller}/>
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </label> */}

      
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <textarea
          placeholder="A short description of yourself"
          name="desc"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
          style={{fontFamily:"sans-serif"}}
        ></textarea>

       </div>
      </div>

    </form>
  </div>
  )
}

export default Register