/* eslint-disable react/prop-types */
import React from 'react';
import './GigCard.scss';
import { Link } from 'react-router-dom';
import stars from '../../static/fiver-img/star.png';
// import heart from '../../static/fiver-img/heart.png';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import noAvatar from "../../static/fiver-img/noavatar.jpg";
import Loader from '../../loader/Loader';
import { FaHeart } from "react-icons/fa";


// import { gigs } from '../../data';





// eslint-disable-next-line react/prop-types
const GigCard = ({item}) => {


  const { isLoading, error, data} = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
     newRequest(`/users/${item.userId}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });







  return (
    <>
    
        <div className="gigCard" key={item.id}>
        <Link to={`/gig/${item._id}`}>
      {/* <img src={item.img} alt="gigCard" /> */}
      <img src={item.cover} alt="gigCard" />

      <div className="info">
       {isLoading ? <Loader />: error ? ("Something went wrong" )
       : (
       <div className="user">
          <img src={data.img || noAvatar } alt="pp" />
          <span style={{textTransform:"capitalize"}}>{data.username}</span>
         </div>
         )}
         <p>{item.title}</p>
         <div className="star">
           <img src={stars} alt="stars" />
           <span>{!isNaN(item.totalStars / item.starNumber) &&
            Math.round(item.totalStars / item.starNumber)}</span>
         </div>

     <hr />
     
        <div className="details">
          <div className="details_img">
          {/* <img src={heart} alt="heart" /> */}
          <FaHeart className='heatImg'/>

          </div>

          <div className="price">
          <span>STARTING AT</span>
          <h2>${item.price}</h2>
          </div>
        </div>

    </div>

      </Link>
      </div>
      
      
      
 






    </>


   
  )
}

export default GigCard
