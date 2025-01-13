/* eslint-disable react/prop-types */
import React from 'react';
import './ProjectCard.scss';
import { Link } from 'react-router-dom';



const ProjectCard = ({item}) => {


  return (
    
        <div className="projectCard" >
        <Link to='/' className='link' >
            <img src={item.img} alt="img" />
          <div className="info">
            <img src={item.pp} alt="pp" />
            <div className="texts">
              <h2>{item.cat}</h2>
              <span>{item.username}</span>
            </div>
            
          </div>

      </Link>
        </div>
      


   
  )
}

export default ProjectCard