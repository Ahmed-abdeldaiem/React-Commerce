import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'

import axios, { all } from 'axios';
import Loder from '../Loder/Loder';
import { UserLoginContext } from '../../Context/UserLoginContext';



export default function AllOrders() {



  const [Loading, setLoading] = useState(false)
  const [allOrders, setAllOrders] = useState([])
  
  let user = localStorage.getItem('userEmail')


function getAllOrders(){

  setLoading(true)
  return axios.get('https://ecommerce.routemisr.com/api/v1/orders').then((data)=>{
 setLoading(false)
//  console.log(user);
 console.log(data.data.data);
 setAllOrders(data.data.data)
//  console.log(data.data.data.map((user)=>user.user.email));


//  console.log(data.data.users.filter((user)=>user.email==user));
 
//  return data.data.data.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))

}).catch((error)=>{
 console.log(error);
})
}



useEffect(() => {
  getAllOrders()

 
}, [])


  return <>

{Loading ? <Loder/> :null}
  
<div className='bg-gray-100 min-h-80 p-4 m-4'>
  <h1 className='text-3xl font-semibold my-4 text-center text-green-500'>Orders In Our Shop</h1>
    {
      allOrders.length==0?<>
    
  <h2 className='text-2xl font-semibold'>No Order Displayed For This TIme</h2></>
  :<>
  
<div className="relative overflow-x-auto sm:rounded-lg">
{allOrders.map((order,index)=>{
  return(
    <div key={index} className='bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
    <div  className=' flex justify-between m-3 '>
    <p className='text-xl font-semibold'>Total Price: <span className='text-xl text-green-500'>{order?.totalOrderPrice}</span></p>
    <p className='text-xl font-semibold'>Total Number of Items: <span className='text-xl text-green-500'>{order?.cartItems[0].count}</span></p>
    </div>

     <div className='flex items-center'>
     <div className='md:w-1/2'>
     <img src={order?.cartItems[0].product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={order?.cartItems[0].product.title} />
     </div>
     <div className='md:w-1/2'>

       <p className='font-semibold text-lg'>{order?.cartItems[0].product.title.split(' ').slice(0,2).join(' ')}</p>
       <p className='font-semibold text-lg'>Payment :{order.paymentMethodType}</p>
       <span   className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid fa-city"></i> {order.shippingAddress?.city}</span>

     </div>

     </div>
     </div>
  )
 




})}

  {/* <div className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
   
    
      {
        cartData?.data?.products.map((product)=>
        <div className=' ' key={product.product._id}>
         
        
        <div className='flex flex-col md:flex-row items-center justify-between w-full p-5'>
       

        <div className='md:w-1/4'>
        <div className="flex items-center">
            <button onClick={()=>updateCartItem(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>updateCartItem(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </div>

        </div>

       
        
       
       
      
       
    
        </div>)
      }
    
   
  </div>

<div className='flex justify-between px-20 my-3'>

  <button onClick={()=>deleteAllCart()} type="button" className="text-white bg-green-500 transition-all duration-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Clear your Cart</button>
  




    <button       
                  onClick={()=>{
                    goToPay(cartId)
                }}
                  type="button"
                  className={`text-white transition-all duration-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:outline-none 
                    ${cartsNumber>0? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-gray-500 cursor-not-allowed'}`}
                  disabled={!checkOut}
                >
                  Check Out
                </button>
  


</div> */}

</div>


  
  
  </>
    }
  
  </div>
  </>
}
