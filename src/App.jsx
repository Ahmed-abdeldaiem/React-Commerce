import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import CounterContextProvider from './Context/LoadingContext'
import UserLoginContextProvider from './Context/UserLoginContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Wishlist from './components/Wishlist/Wishlist'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoadingContextProvider from './Context/LoadingContext'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishListContextProvider from './Context/WishListContext'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'


let query = new QueryClient();




let route = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'categories' ,element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands' ,element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'cart' ,element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'products' ,element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'login' ,element:<Login/>},
    {path:'register' ,element:<Register/>},
    {path:'productdetails/:id/:category' ,element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'products/productdetails/:id/:category' ,element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'wishList' ,element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'check-out/:cartId' ,element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders' ,element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'forgetpassword' ,element:<ForgetPassword/>},
    {path:'verify-code' ,element:<VerifyCode/>},
    {path:'reset-password' ,element:<ResetPassword/>},
    {path:'*' ,element:<NotFound/>},
  ]}
])




function App() {
 

  return (
    <>
     
<QueryClientProvider client={query}>

<UserLoginContextProvider>
  <CartContextProvider>
    <WishListContextProvider>
<LoadingContextProvider>


   

    <RouterProvider router={route}>

</RouterProvider>
<ReactQueryDevtools/>
<Toaster />
    
    </LoadingContextProvider>
    </WishListContextProvider>
  </CartContextProvider>
  </UserLoginContextProvider>
</QueryClientProvider>


 
    </>
  )
}

export default App
