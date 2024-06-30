import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { UserLoginContext } from '../../Context/UserLoginContext'
import { WishListContext } from '../../Context/WishListContext'
import FreshFooter from '../Footer/Footer'

import NavBar from '../NavBar/NavBar'
import style from './Layout.module.css'






export default function Layout() {
  let {getLoggedUserCart,setCartsNumber} =useContext(CartContext)
  let {addProductToWishList,getLoggedUserWishList}=useContext(WishListContext)
 

const [counter, setcounter] = useState(0)

useEffect(() => {
  
  getCartItems()
  getWishItems()


}, [])

async function getCartItems(){
  
  let response =await getLoggedUserCart()
 
 
  if (response=='No cart exist for this user') {
  
    setCartsNumber(0)
  }
 
}

async function getWishItems(){
 
  let wishList =await getLoggedUserWishList()
  
  // setWishListdata(wishList.data.data)
  // console.log(wishList.data.data);
  // setHearts(wishList.data.data.map(wish => wish.id));
 
}


  return <>
    <NavBar/>
  <div className="container mt-20 min-h-screen">

 <Outlet/>

  </div>
  <FreshFooter/>
 

  </>
}
