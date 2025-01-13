/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './Featured.scss';
import {GoSearch} from 'react-icons/go';
import mann from '../../static/fiver-img/mman.png';
import {Link, useNavigate} from "react-router-dom";


const Featured = ({item}) => {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {

    // const search = search ? "search" :
    navigate(`/gigs?search=${input}`)


  }


  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
          <h1>Find the perfect <i className='freelance'>freelance</i> services for your business</h1>
         
              
          <div className="search">
              <GoSearch className='search-icon'/>
            <div className="searchInput">
              <input type="text" placeholder="Search freelance services" onChange={e => setInput(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
            
        


          <div className="popular">
            <span>Popular:</span>
            <Link to={`gigs/?cat=${item.cat="SEO"}`}>
            <button className='popular-bth'>Digital Marketing</button>
            </Link>
            <Link to={`gigs/?cat=${item.cat="ai"}`}>
            <button className='popular-bth'>Artificial Intelligence</button>
            </Link>
            <Link to={`gigs/?cat=${item.cat="ui design"}`}>
            <button className='popular-bth'>UX/UI Design</button>
            </Link>
            <Link to={`gigs/?cat=${item.cat="web development"}`}>
            <button className='popular-bth'>Web Development</button>
            </Link>

           
          </div>
        </div>
        <div className="right">

          <img style={{width:"500px"}} className='manImg' src={mann} alt="man" />
        </div>
      </div>
        
        </div>
  )
}

export default Featured