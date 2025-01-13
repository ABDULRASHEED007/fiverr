/* eslint-disable react/prop-types */
import React from 'react'
import './Slide.scss';
import Slider from "infinite-react-carousel";





const Slide = ({arrowScroll, slidesToShow, children}) => {




  return (
    <div className='slider'>
      <div className="container">




  <Slider slidesToShow={slidesToShow} arrowsScroll={arrowScroll}>

    {
     children

    }


  </Slider>





</div>
    </div>
  )
}

export default Slide








