import React, { useContext, useEffect, useState } from 'react'
import style from './NavBar.module.css'

// import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { UserLoginContext } from '../../Context/UserLoginContext';
import { CartContext } from '../../Context/CartContext';



export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  
  const {userLogin,setUserLogin,userName} = useContext(UserLoginContext)
  let {cartsNumber} =useContext(CartContext)
 let  navigate =useNavigate()

function logOut(){
  localStorage.removeItem('userToken');
  localStorage.removeItem('userEmail')
  setUserLogin(null)
  navigate('/login')
}

useEffect(() => {
  
  if (localStorage.getItem('userToken')!==null) {
    setUserLogin(localStorage.getItem('userToken'))
    // console.log('Nav',userLogin);
}


 
}, [])



return (


  <header className="bg-gray-100 fixed top-0 z-50 w-full">
  <div className="mx-auto flex justify-between h-16 w-full items-center gap-8 px-4 sm:px-6 lg:px-8">
    <div className='flex flex-row '>
    <Link className="block text-gray-950 text-xl xl:text-2xl font-bold me-5"  to="">
   
     
    {/* <img src={logo} width={70} alt="logo image" className='rounded-xl' /> */}
    <i className="fa-solid fa-cart-shopping text-green-500"></i>
    fresh cart
    </Link>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden lg:block">
        <ul className="flex items-center gap-6 font-semibold">
        {
          userLogin !==null ?<>
            <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="">Home</NavLink>
          </li>
          <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="cart">Cart</NavLink>
          </li>
          <li>
          <NavLink className='p-2 text-gray-500 text-nowrap linkStyle' to="wishList">Wish list</NavLink>
          </li>
          <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="products">Products</NavLink>
          </li>
          <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="categories">Categories</NavLink>
          </li>

          <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="brands">Brands</NavLink>
          </li>

         

         
          {/* <li>
          <span className='bg-red-300 p-5'>{userName}</span>
          </li> */}</>
          :null}

        


        
        </ul>
      </nav>

    
    </div>




    </div>

    <div className="flex items-center gap-4">
        <div className=" hidden lg:flex sm:gap-4">
        {
         userLogin ===null ?<>
          <NavLink className='p-2 font-semibold' to="login">Login</NavLink>

<NavLink className='p-2 font-semibold' to="register">
    Register
  </NavLink>
         </>
         : null}

         {
          userLogin !==null ?<>
           <span onClick={logOut} className='p-2 font-semibold cursor-pointer'>
            LogOut
          </span>
          </>
          :null}
          <div className='flex flex-row items-center justify-center'>
          {   userLogin !==null ? <Link to={'cart'}> <i className='fa-solid fa-cart-shopping cursor-pointer text-2xl hover:text-gray-900 transition-all duration-500 text-gray-700 mx-2 relative'><span className="absolute bottom-3 left-3 bg-green-400 text-white text-sm font-semibold me-2 px-2 py-0.5 rounded-3xl dark:bg-green-900 dark:text-green-300">{cartsNumber}</span>
</i></Link>
:null}
          <i className='fab fa-facebook mx-2 text-green-700 hover:text-blue-700 transition-all duration-500'></i>
          <i className='fab fa-twitter mx-2 text-green-700 hover:text-blue-300 transition-all duration-500'></i>
          <i className='fab fa-instagram mx-2 text-green-700 hover:text-red-950 transition-all duration-500'></i>
          <i className='fab fa-youtube mx-2 text-green-700 hover:text-red-500 transition-all duration-500'></i>
          
          </div>
        </div>
        {   userLogin !==null  ? <Link className='lg:hidden' to={'cart'}> 
          <i className='fa-solid fa-cart-shopping cursor-pointer text-2xl hover:text-gray-900 transition-all duration-500 text-gray-700 mx-2  relative'><span className="absolute bottom-3 left-3 bg-green-400 text-white text-sm font-semibold me-2 px-2 py-0.5 rounded-3xl dark:bg-green-900 dark:text-green-300">{cartsNumber}</span>
</i></Link>
:null}
        <button
        onClick={() => setIsOpen(!isOpen)}
          className="block rounded bg-gray-300  p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

  </div>

  <div className={`${isOpen ? 'max-h-screen' : 'max-h-0'} lg:hidden overflow-hidden transition-max-height duration-700 ease-in-out`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col ">
        {
          userLogin !==null ?<>
         <NavLink className='p-2 linkStyle' to="">Home</NavLink>
         <NavLink className='p-2 linkStyle' to="cart">Cart</NavLink>
         <NavLink className='p-2  linkStyle' to="wishList">Wish list</NavLink>

        <NavLink className='p-2 linkStyle' to="categories">Categories</NavLink>
        <NavLink className='p-2 linkStyle' to="brands">Brands</NavLink>
        <NavLink className='p-2 linkStyle' to="products">Products</NavLink>
        
        <span onClick={logOut} className='p-2 font-semibold cursor-pointer'>
            LogOut
          </span>
        </>
        
          :null}
       {
         userLogin ===null ?<>
          <NavLink className='p-2 font-semibold' to="login">Login</NavLink>
        <NavLink className='p-2 font-semibold' to="register">
            Register
          </NavLink>
         </>
         : null}

      
        
          <div className='flex flex-row items-center justify-center'>
          {/* {   userLogin !==null ? <Link to={'cart'}> 
          <i className='fa-solid fa-cart-shopping cursor-pointer text-2xl hover:text-gray-900 transition-all duration-500 text-gray-700 mx-2  relative'><span className="absolute bottom-3 left-3 bg-green-400 text-white text-sm font-semibold me-2 px-2 py-0.5 rounded-3xl dark:bg-green-900 dark:text-green-300">{cartsNumber}</span>
</i></Link>
:null} */}
          
          <i className='fab fa-facebook mx-2 text-green-700 hover:text-blue-700 transition-all duration-500'></i>
          <i className='fab fa-twitter mx-2 text-green-700 hover:text-blue-300 transition-all duration-500'></i>
          <i className='fab fa-instagram mx-2 text-green-700 hover:text-red-950 transition-all duration-500'></i>
          <i className='fab fa-youtube mx-2 text-green-700 hover:text-red-500 transition-all duration-500'></i>
         
          </div>
        </div>
      </div>


</header>
);
}







