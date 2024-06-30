import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext } from 'react';
import { LoadingContext } from '../../Context/LoadingContext';






export default function CategorySlider() {

  const {Loading , setLoading} = useContext(LoadingContext)

  let settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [categories, setCategories] = useState([])

  function getCategories(category){
   
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      
      let allCategories= data.data;
      // console.log(allCategories);
      
      setCategories(allCategories);
     
    }).catch((error)=>{
    
      console.log('can not get this product ' , error);
    
    
    })
    }
    
    useEffect(() => {
  
  
      getCategories()
   
      
    }, [])
    


  return <>
  

  
  

 <Slider {...settings} className='my-10'>


 {categories?.map((category,index)=>
 <div key={index} className='p-0 m-0'>
  <img className='h-[200px] w-full size-fit' src={category.image} alt={category.name} />
  <h2 className='font-semibold text-gray-800 text-xl px-4'>{category.name}</h2>
 </div>
 )}


 </Slider>



  </>
}
