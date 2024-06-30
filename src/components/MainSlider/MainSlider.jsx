import React, { useRef, useState } from 'react'
import style from './MainSlider.module.css'
import main1 from '../../assets/main1.jpg'
import main2 from '../../assets/main2.jpg'
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function MainSlider() {

  let settings={
    dots: false,
    dotsClass: "slick-dots",
    infinite: true,
    arrows:false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
   

  }

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };



  return <>
  
<div className="row justify-center">
  <div className='w-full md:w-1/4 text-center'>
    <Slider ref={slider => {sliderRef = slider;}} {...settings}>
      <img className='h-[400px] w-full size-fit' src={slide1} alt="image for slide 1" />
      <img className='h-[400px] w-full size-fit' src={slide2} alt="image for slide 2" />
      <img className=' w-full size-fit' src={slide3} alt="image for slide 3" />
    </Slider>
    <div  className='text-center flex items-center justify-center my-4 gap-3'>
    <button className=" w-[15px] h-[7px] bg-green-300 rounded-3xl hover:bg-green-500 transition-all duration-500" onClick={previous}>
      
    </button>
    <button className=" w-[15px] h-[7px] bg-green-300 rounded-3xl  hover:bg-green-500 transition-all duration-500" onClick={next}>
      
    </button>
  </div>
  </div>
 
  <div className='w-full md:w-1/4'>
    <img className='w-full size-fit h-[219px]' src={main1} alt="main image 1" />
    <img className='w-full size-fit h-[219px]' src={main2} alt="main image 2" />
  </div>
</div>

  </>
}
