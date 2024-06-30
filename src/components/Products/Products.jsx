import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import { Button, Label, TextInput } from "flowbite-react";
import {  LoadingContext } from '../../Context/LoadingContext';
import axios from 'axios';
import { UserLoginContext } from '../../Context/UserLoginContext';
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Query, useQuery } from '@tanstack/react-query';
import FadeLoader from 'react-spinners/FadeLoader'
import Loder from '../Loder/Loder';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';


export default function Home() {
  const [Loading, setLoading] = useState(false)

  
  const [wishListdata, setWishListdata] = useState([])
  const [hearts, setHearts] = useState([])
  // const {Loading , setLoading} = useContext(LoadingContext)
  let {addProductToCart} =useContext(CartContext)
  let {addProductToWishList,getLoggedUserWishList}=useContext(WishListContext)


  let formik = useFormik({
    initialValues:{
    
      search:"",
    
     
    },
    
    onSubmit:handleSearch,
  
  });

  let  {data ,isError , isLoading ,isFetching ,refetch} =useProducts(formik.values.search)

  const {userLogin,userName,setUserLogin,setUserName} = useContext(UserLoginContext)


function handleSearch(formValues){

 
//  console.log(formValues.search);

//  getRelatedProducts(formValues.search)

//  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
// console.log(formik.values.search);
return formValues.search
}



useEffect(() => {
  refetch();
  getWishItems()
}, [formik.values.search]);


async function addToCart(productId){
  setLoading(true)
  let response=  await addProductToCart(productId);
  setLoading(false)
  // setCartsNumber(response.data.numOfCartItems)
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
  setWishListdata(wishList.data.data)
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
  setWishListdata(wishList.data.data)
  setHearts(wishList.data.data.map(wish => wish.id));
 
}






  return <>
{isLoading ||Loading ? <Loder/> :null}
{
 <>
  <div className='mt-20 mb-3 m-auto w-1/2'>

<form  onSubmit={formik.handleSubmit} onChange={formik.handleSubmit}>
      <TextInput onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.search}  type="text" name="search" id="search" sizing="md" placeholder='Search ...'/>
      </form>

  

</div>
<div className="row my-5">


{
      data?.map((product)=><div className='md:w-1/2 lg:w-1/4 px-4  my-7 ' key={product.id}>
          <div className='item group p-3'>
            <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <img className='w-full size-fit' src={product.imageCover} alt={product.title}/>
          <h4 className='text-green-500 font-normal text-sm my-1'>{product.category.name}</h4>
          <h5 className='font-semibold text-lg my-3'>{product.title.split(' ').slice(0,2).join(' ')}</h5>
          <div className='flex justify-between'>
          <span>{product.price} EGP</span>
          <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div>
         
         {/* <div className='flex items-center justify-center'>
      
         <button className='my-2 font-semibold text-md text-white  px-10 py-2 text-center bg-green-400 rounded-lg translate-y-20 group-hover:translate-y-0 transition-all duration-700'>+Add</button>
         </div> */}
         </Link>
         <div className='mt-2 text-right'>
         
         <i onClick={()=>addToWishList(product.id)} className={`fas fa-heart ${hearts.includes(product.id) ? 'text-red-600' : 'text-gray-950'} text-3xl`}></i>
        </div>
         <div className='flex items-center justify-center'>
      
      <button onClick={()=>addToCart(product.id)} className='my-2 font-semibold text-md text-white  px-10 py-2 text-center bg-green-400 rounded-lg translate-y-20 group-hover:translate-y-0 transition-all duration-700'>+Add</button>
      </div>
        </div>
        </div>
        
        )
    
 
}




</div>

  </>
  
}





  </>
}



  // const [isLoading, setIsLoading] = useState(false)
  // const [products, setProducts] = useState([])



// function getRelatedProducts(search){
//   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//   .then(({data})=>{
   
//     let allProducts= data.data;
//     let relatedProduct =allProducts.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
//     setProducts(relatedProduct);
//   }).catch((error)=>{
  
//     console.log('can not get this product ' , error);
  
  
//   })
//   }

// useEffect(() => {
  
//   axios.get('https://ecommerce.routemisr.com/api/v1/products').then(
//       ({data})=>{
//         console.log('hi' ,data.data);
//         setProducts(data.data);


//       }
//   ).catch(
// (error)=>{
//   console.log(error);
//   console.log(error?.response?.data?.message);
//       }
//   )



// }, [])



