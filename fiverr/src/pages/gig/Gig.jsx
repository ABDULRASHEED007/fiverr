import React from 'react'
import './Gig.scss';
import stars from '../../static/fiver-img/star.png';
import clock from '../../static/fiver-img/clock.png';
import recycle from '../../static/fiver-img/recycle.png';
import greenCheck from '../../static/fiver-img/greencheck.png';
import 'react-multi-carousel/lib/styles.css';
import { Slider } from 'infinite-react-carousel';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
// import { gigImg } from '../../data';
import noAvatar from "../../static/fiver-img/noavatar.jpg";
import Reviews from '../../components/reviews/Reviews';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';


const Gig = () => {

  const {id} = useParams();

  const { isLoading, error, data} = useQuery({
    queryKey: [`gig`],
    queryFn: () =>
     newRequest(`/gigs/single/${id}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
  });


  const userId = data?.userId


  const { isLoading: isLoadingUser, error: errorUser, data: dataUser} = useQuery({
    queryKey: [`user`],
    queryFn: () =>
     newRequest(`/users/${userId}`).then((res) => {
    //  newRequest(`/gigs${search}`).then((res) => {
      return res.data;
     }),
     enabled: !!userId,
  });




  return (
    <div className='gig'>
     { isLoading ? <Loader />: error ? "Something went wrong!" :
      <div className="container">
        <div className="left">
          <span className="breadCrumbs">FIVERR &gt; <span style={{textTransform:"uppercase"}} className='catt'>{data.cat} </span> &gt; Gig ID: <span className='idd'>{id}</span></span>
          <h1>{data.title}</h1>
          { isLoadingUser ? ( "Loading" ): errorUser ? ("Something went wrong!") :
           ( <div className="User">
            <img src={dataUser.img || noAvatar} style={{"width":"32px", "height":"32px"}} className='pp' alt="img" />
            <span style={{textTransform:"capitalize"}}>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) && (
            <div className="stars">
               {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

              <img key={i} src={stars} style={{"width":"20px"}} alt="stars" />
               ))}
              <span>
              {Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
              )}
          </div>
          )}

          <div className="slideImg">

            <Slider slidesToShow={1} arrowScroll={1}>

          {data.images.map((img) => (
            <img key={img} src={img} alt="gigImg" />              

          ))}
            

            </Slider>

          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRax287R-IqOG2M1ZJCWimhVcye6LLEXbSFnA&usqp=CAU" alt="gigImg" /> */}

          </div>
         
       






    <h2>About This gig</h2>

    <p>
     {data.desc}
      </p>

     { isLoadingUser ? ( <Loader /> ): errorUser ? ("Something went wrong!") :
  ( <div className="seller">
     <h2>About the seller</h2>
     <div className="user">
         <img src={dataUser.img || noAvatar} style={{"width":"100px", "height":"100px"}} alt="img" />
        
         <div className="info">
          <span style={{textTransform:"capitalize"}}>{dataUser.username}</span>
          {!isNaN(data.totalStars / data.starNumber) && (
            <div className="stars">
               {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

              <img key={i} src={stars} style={{"width":"20px"}} alt="stars" />
               ))}
            
              <span>
              {Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
              )}
            <button>Contact Me</button>
         </div>
     </div>
    

     <div className="boxx">
      <div className="itemss">
      <div className="itemm">
        <span className="titlee">From</span>
        {/* <span className="descc">{dataUser.country || "India"}</span> */}
        <span className="descc">{dataUser.country || "unspecified"}</span>
      </div>
      <div className="itemm">
        <span className="titlee">Member since</span>
        <span className="descc">Aug 2020</span>
      </div>
      <div className="itemm">
        <span className="titlee">Last Delivery</span>
        <span className="descc">4 hours ago</span>
      </div>
      <div className="itemm">
        <span className="titlee">Languages known</span>
        <span className="descc">English, Hindi, Telugu</span>
      </div>
      </div>
      <hr />
      {/* <p>{dataUser.desc}</p> */}
      <p>{dataUser.desc}</p>
     </div>
     
   </div>
  )}

     <Reviews gigId={id}/>




        </div>
        <div className="right">
        <div className="price">
        <h3>{data.shortTitle}</h3>
        <h2>${data.price}</h2>
        </div>
        <p>
         {data.desc}
        </p>
        <div className="details-right">
          <div className="item-details">

        <img src={clock} alt="clock" />
        <span>{data.deliveryTime} days Delivery</span>
          </div>

          <div className="item-details">
        <img src={recycle} alt="recycle" />
        <span>{data.revisionNumber}  Revisions</span>
          </div>

        </div>

        <div className="features">

          {data.features.map((feature) => (
            <div key={feature} className="item-features">
            <img src={greenCheck} alt="check" />
            <span className='feature'>{feature}</span>
          </div>
          ))}
          
        </div>

          <Link to={`/pay/${id}`}>
        <button >Continue</button>
          </Link>
        </div>
      </div> 
      }
    </div>
  )
}

export default Gig