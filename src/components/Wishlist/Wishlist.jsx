import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'
import Loder from '../Loder/Loder'
import style from './Wishlist.module.css'





export default function Wishlist() {

  let {addProductToCart} =useContext(CartContext)
  let {removeWishListItem,getLoggedUserWishList}=useContext(WishListContext)
  const [wishListdata, setWishListdata] = useState([])
  const [Loading, setLoading] = useState(false)
  const [hearts, setHearts] = useState([])
  


  async function getWishItems(){
    setLoading(true)
    let wishList =await getLoggedUserWishList()
    setLoading(false)
    setWishListdata(wishList.data.data)
    console.log(wishList.data.data);
    // setHearts(wishList.data.data.map(wish => wish.id));
   
  }


  async function deleteItem(wishID){
    setLoading(true)
    let response =await removeWishListItem(wishID)
    setLoading(false)
  
    // console.log(response.data);
    await getWishItems()
    
  }
  

  useEffect(() => {
   
    getWishItems()

  }, []);
  

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

   await deleteItem(productId)
  }




  return <>
  {Loading ? <Loder/> :null}
  <div className='bg-gray-100 min-h-80 p-4 m-4'>
  <h1 className='text-3xl font-semibold my-4 text-left text-green-500'>My Wish List</h1>
    {
      wishListdata.length==0?<>
    
  <h2 className='text-2xl font-semibold'>'Your Wish List Is Empty'</h2></>
  :
  <>
  
  

  <div className="relative overflow-x-auto sm:rounded-lg">
 
    <div className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
     
      
        {
          wishListdata?.map((wish,index)=><div className=' bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={index}>
           
          
          <div className='flex flex-col md:flex-row items-center justify-between w-full p-5'>
          <div className='flex items-center md:w-1/2'>
          <div className='md:w-1/2'>
          <img src={wish.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={wish.title} />
          </div>
          <div className='md:w-1/2'>
  
            <p className='font-semibold text-lg'>{wish.title?.split(' ').slice(0,2).join(' ')}</p>
            <p className='font-semibold text-lg'>{wish.price} EGP</p>
            <span  onClick={()=>deleteItem(wish.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid fa-trash-can"></i> Remove</span>
  
          </div>
  
          </div>

          <div className='md:w-1/4'>
        <div className="flex items-center">

        <button onClick={()=>addToCart(wish.id)} type="button" className="text-white bg-green-500 transition-all duration-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Add To Cart</button>


          </div>
          </div>
  
        
  
          </div>
  
         
          
         
         
        
         
      
          </div>)
        }
      
     
    </div>
  

  </div>
  
  
    
    
    </>}
  
  </div>
  
  
  </>
}


