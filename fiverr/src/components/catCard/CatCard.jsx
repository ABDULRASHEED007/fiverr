import React from 'react';
import "./catCard.scss";
import { Link } from 'react-router-dom';

const catCard = ({item}) => {
  return (
      <div className='catCard'>
        <Link to={`/gigs/?cat=${item.cat}`}>
       <img src={item.img} alt={item.title} />
       <span className='desc'>{item.desc}</span>
       <span className='title'>{item.title}</span>
    </Link>
        </div>
  )
}

export default catCard