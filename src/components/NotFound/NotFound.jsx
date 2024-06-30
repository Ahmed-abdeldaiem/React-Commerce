import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './NotFound.module.css'





export default function NotFound() {

const [counter, setcounter] = useState(0)

  return <>
  
  <h2 className='text-4xl font-bold text-center text-green-500 my-2'>404 Not Found</h2>
  <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" className='w-full' alt="error image 404" />
  <p className='text-green-500 text-center'>You can back to home from here : <Link to='/'><span className='text-red-400 transition-all duration-500 font-semibold cursor-pointer hover:text-red-800'>HOME</span></Link></p>
  
  </>
}
