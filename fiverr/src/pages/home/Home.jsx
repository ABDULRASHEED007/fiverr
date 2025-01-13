import React from 'react'
import './Home.scss';
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trusted/TrustedBy';
import Slide from '../../components/slide/Slide';
import CatCard from '../../components/catCard/CatCard';
import { TbCategory2 } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import { GiElectric } from "react-icons/gi";
import { FaRegCircleCheck } from "react-icons/fa6";
import ProjectCard from '../../components/projectCard/ProjectCard';
import Video from "../../fiverr_Assets/fivverVideo.mp4"
import middleImg from "../../fiverr_Assets/fiverr_middleIMG.webp"
// import AIArt from "../../fiverr_Assets/Ai Art.mp4"
import { cards, projects } from '../../data';


const Home = () => {



 

  return (
    <div className='home'>
      <Featured item={cards}/>
      <TrustedBy />
      <Slide slidesToShow={5}  arrowScroll={3}>

      {
        cards.map(card => (
          <CatCard  key={card.id} item={card}/>
        ))
      }

      </Slide>

    <div className="features">
      <div className="check-container">
        <h1 className='check-h1'>A whole world of freelance talent at your fingertips</h1>
        <div className="item">

        <div className="fiverr_details">

        <div className="check-title">

          <TbCategory2 className='checkicon'/>
          Over 700 categories
        </div>
        <p className="check-para"> Get results from skilled freelancers from all over the world, for every task, at any price point.</p>

        </div>


        <div className="fiverr_details">

        <div className="check-title">
          <FaRegHandshake className='checkicon'/>
          Clear, upfront pricing
        </div>
        <p className="check-para"> No hourly rates, just project-based pricing. Payments only get released when you approve.</p>

        </div>




        <div className="fiverr_details">


        <div className="check-title">
          <GiElectric className='checkicon'/>
          Quality work done faster
        </div>
        <p className="check-para">Filter to find the right freelancers quickly and get great work delivered in no time, every time.</p>
        </div>



        <div className="fiverr_details">

        <div className="check-title">
          <RiCustomerService2Line className='checkicon'/>
          Count on 24/7 support
        </div>

        <p className="check-para"> Chat with our team to get your questions answered or resolve any issues with your orders.</p>
       
      </div>
      </div>









        <div className="videoItem">


          <video autoPlay muted src={Video} controls>
            
          </video>
       
      </div>

      </div>




{/* *********************************************** */}



    </div>





    <div className="features dark">
      <div className="DarkContainer">
        <div className="DarkItem">
      <h1>fiverr pro.</h1>
      <h3>We&apos;re here for your <br />
      e-Commerce everything</h3>
      
      <div className="DarkTitle">
        <FaRegCircleCheck />
        Get a Project Manager
      </div>
        <p className="DarkPara">to guide you through each stage of launching your e-Commerce business</p>
      <div className="DarkTitle">
        <FaRegCircleCheck />
        Accelerate time-to-market
      </div>
      <p className="DarkPara">with a dedicated team of top-tier freelance experts</p>
     
      <button className='getStarted'>Get Started</button>
        </div>



        <div className="check-img">
          <img  src={middleImg} alt="img" />
        </div>
      </div>
    </div>



    {/* <div className="fiverr_business">
      <div className="fiverr_business_container">
        <div className="AIArt">
          <video autoPlay controls loop a src={AIArt}></video>
          <p className="AIArt Desc">
            AI Technology Art & Design
          </p>
        </div>
      </div>
    </div> */}



    

    <Slide slidesToShow={4} arrowScroll={4}>

      {
        projects.map(card => (
          <ProjectCard  key={card.id} item={card}/>
        ))
      }

      </Slide>
      </div>

  )
}

export default Home