import React, { useState } from 'react'
import style from './Footer.module.css'


import logo from '../../assets/logo.png'



export default function FreshFooter() {



return <>
 <div className="row bg-slate-200 ">
  <div className='md:w-1/2 flex flex-col py-3'>
  <h2 className='text-3xl text-lime-800 font-bold'>Ahmed Abdeldaiem</h2>
  <h2 className='text-lg text-lime-800 font-semibold'>All Right reserved @ Route <i className='fas fa-heart text-red-600'></i></h2>
  </div>
  <div className='md:w-1/2 flex flex-col'>
  <h2 className='text-lg text-lime-800 font-semibold text-center'>Follow ME <i className='fas fa-heart text-red-600'></i></h2>
  <div className='flex justify-center gap-4 my-2'>
          <a href="https://www.linkedin.com/in/ahmed-abdeldaiem-a26079227/" target={'_blank'}><i className="fa-brands fa-linkedin-in mx-2 cursor-pointer text-2xl text-green-500 hover:text-red-500 transition-all duration-500"></i></a>
          
          <a href="https://github.com/Ahmed-abdeldaiem" target={'_blank'}><i className='fab fa-github mx-2 cursor-pointer text-2xl text-green-500 hover:text-red-500 transition-all duration-500'></i></a>
          <a href="https://www.facebook.com/prince.medo.940436" target={'_blank'}><i className='fab fa-facebook mx-2 cursor-pointer text-2xl text-green-500 hover:text-red-500 transition-all duration-500 '></i></a>
          
          
          
          
  </div>
  </div>
 </div>

</>
}




