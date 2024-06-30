import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loder from '../Loder/Loder';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';



export default function ProductDetails() {


  let {addProductToWishList,getLoggedUserWishList}=useContext(WishListContext)
 
  let {addProductToCart} =useContext(CartContext)

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };


  let settings2={
    dots: false,
    dotsClass: "slick-dots",
    infinite: true,
    
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
   

  }



  let settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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


let {id}=useParams();
let {category}=useParams();
const [productDetails, setProductDetails] = useState(0)
const [relatedProducts, setRelatedProducts] = useState([])
const [Loading, setLoading] = useState(false)
const [hearts, setHearts] = useState([])
// const [wishListdata, setWishListdata] = useState([])


function getProductDetails(id){
  setLoading(true)
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then(({data})=>{
  setLoading(false)
  setProductDetails(data.data);
  // console.log(data.data.images.length);
  // console.log(data.data);
  
}).catch((error)=>{

  console.log('can not get this product ' , error);


})
}
function getRelatedProducts(category){
axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
.then(({data})=>{
 
  let allProducts= data.data;
  let relatedProduct =allProducts.filter((product)=>product.category.name==category)
 setRelatedProducts(relatedProduct);
}).catch((error)=>{

  console.log('can not get this product ' , error);


})
}



useEffect(() => {
  
  
  getProductDetails(id)
  getRelatedProducts(category)
  getWishItems()
}, [id ,category])




async function addToCart(productId){
  setLoading(true)
  let response=  await addProductToCart(productId);
  setLoading(false)
  
  if (response.data.status=='success') {
    toast.success(response.data.message,{
      duration: 2500,
      position: 'top-right',
    
      // Styling
      style:{
        background:'#4fa74f',
         color:'#fff',
        fontWeight:'bold'
        

      },
     
    
      // Custom Icon
      icon: '👏',
    })
  }else{
    toast.error(response.data.message,{
      duration: 2500,
      position: 'top-right',
    
      // Styling
      style:{
        background:'red',
         color:'#fff',
        fontWeight:'bold'
        

      },
     
    
    
    })
  }
}

async function addToWishList(productId){
  setLoading(true)
  let response=  await addProductToWishList(productId);
  let wishList =await getLoggedUserWishList()
  console.log(wishList.data.data);
  // setWishListdata(wishList.data.data)
  setHearts(wishList.data.data.map(wish => wish.id));
  console.log(hearts);
    
  
  console.log(hearts);
  setLoading(false)

  // setHeartId(productId)
  if (response.data.status=='success') {
    toast.success(response.data.message,{
      duration: 2500,
      position: 'top-right',
    
      // Styling
      style:{
        background:'#4fa74f',
         color:'#fff',
        fontWeight:'bold'
        

      },
     
    
      // Custom Icon
      icon: '👏',
    })
  }else{
    toast.error(response.data.message,{
      duration: 2500,
      position: 'top-right',
    
      // Styling
      style:{
        background:'red',
         color:'#fff',
        fontWeight:'bold'
        

      },
     
    
    
    })
  }
}


async function getWishItems(){
  setLoading(true)
  let wishList =await getLoggedUserWishList()
  setLoading(false)
  // setWishListdata(wishList.data.data)
  setHearts(wishList.data.data.map(wish => wish.id));
 
}


  return <>
  
 {Loading ? <Loder/> :null}
<div className="row">
  <div className='w-full md:w-1/4'>
  

  {productDetails?.images?.length>1 ?<Slider ref={slider => {sliderRef = slider;}}  {...settings2}>
   { productDetails?.images?.map((image,index)=>
     <img key={index} className='w-full size-fit' src={image} alt={productDetails.title} />
    )
  }
   </Slider>     : <img className='w-full size-fit' src={productDetails?.imageCover} alt={productDetails?.title} />}
   
  
 
    
  {
    productDetails?.images?.length>1 ?   <div  className='text-center flex items-center justify-center mt-4 gap-3'>
    <button className=" w-[15px] h-[7px] bg-green-300 rounded-3xl hover:bg-green-500 transition-all duration-500" onClick={previous}>
      
    </button>
    <button className=" w-[15px] h-[7px] bg-green-300 rounded-3xl  hover:bg-green-500 transition-all duration-500" onClick={next}>
      
    </button>
  </div> : null
  }




  </div>
  <div className='w-full md:w-3/4 px-5'>
  <h3 className='font-semibold text-2xl my-1'>{productDetails.title}</h3>
  <p className='text-gray-900 font-normal my-3'>{productDetails.description}</p>
  <div className='flex justify-between my-3'>
    <span>{productDetails.price} EGP</span>
    <span><i className='fas fa-star text-yellow-400'></i>{productDetails.ratingsAverage}</span>
    </div>
  
   <div className='flex items-center justify-center'>

   <button onClick={()=>addToCart(productDetails.id)}  className='my-2 mx-10 w-full font-semibold text-md text-white  px-10 py-2 text-center bg-green-400 rounded-lg '>+Add</button>
   <i onClick={()=>addToWishList(productDetails.id)} className={`fas fa-heart ${hearts.includes(productDetails.id) ? 'text-red-600' : 'text-gray-950'} text-3xl`}></i>
   </div>
  </div>
 </div>

 <h2 className='text-green-500 font-semibold mt-10 text-2xl'>Related Products</h2>
 


 <Slider  {...settings}  className='my-8 px-4 border-green-300 border-t-2'>
{relatedProducts?.map((product,index)=>
    <div className='item group p-3 px-5 mx-2  my-7 ' key={index}>
    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
  <img className='w-full size-fit' src={product.imageCover} alt={product.title}/>
  <h4 className='text-green-500 font-normal text-sm my-1'>{product.category.name}</h4>
  <h5 className='font-semibold text-lg my-3'>{product.title.split(' ').slice(0,2).join(' ')}</h5>
  <div className='flex justify-between'>
  <span>{product.price} EGP</span>
  <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
  </div>
  <div className='mt-2 text-right'>
 <i onClick={()=>addToWishList(product.id)} className={`fas fa-heart ${hearts.includes(product.id) ? 'text-red-600' : 'text-gray-950'} text-3xl`}></i>
</div>
 <div className='flex items-center justify-center'>

 </div>
 </Link>
<div className='flex justify-center'>
<button onClick={()=>addToCart(product.id)}  className='my-2 font-semibold text-md text-white  px-10 py-2 text-center bg-green-400 rounded-lg translate-y-20 group-hover:translate-y-0 transition-all duration-700'>+Add</button>

</div>
</div>
 
  
  )}
</Slider>





 
  </>
}



