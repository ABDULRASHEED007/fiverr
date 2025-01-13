/* eslint-disable react/prop-types */
import React from 'react'
import "./Review.scss";
import like from '../../static/fiver-img/like.png';
import dislike from '../../static/fiver-img/dislike.png';
import stars from '../../static/fiver-img/star.png';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import noAvatar from "../../static/fiver-img/noavatar.jpg";


const Review = ({review}) => {

  const { isLoading, error, data} = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
     newRequest(`/users/${review.userId}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });




  return (
    <div className="review">
   { isLoading ? ("loading" ): error ? ("Something went wrong!" ):
    (<div className="user-reviews">
      <img src={data.img || noAvatar} style={{"width":"50px"}} className='pp1' alt="user-reviews" />
      <div className="info-reviews">
        <span style={{textTransform:"capitalize"}}>{data.username}</span>
        <div className="country">
          <span style={{textTransform:"capitalize"}}>{data.country}</span>
        </div>
      </div>
    </div>
    )}
     <div className="stars">
      {Array(review.star).fill().map((item, i)=> (
        
        <img src={stars} style={{"width":"20px"}} alt="stars" key={i}/>
      ))}

        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>

  <div className="helpful">
    <span>Helpful?</span>
    <img src={like} style={{"width":"20px"}} alt="yes" />
    <span>Yes</span>
    <img src={dislike} style={{"width":"20px"}} alt="no" />
    <span>No</span>
  </div>

  </div>

  )
}

export default Review
