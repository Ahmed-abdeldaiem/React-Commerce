import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserLoginContext } from '../../Context/UserLoginContext';
import { CartContext } from '../../Context/CartContext';



export default function Register() {

  const {userLogin,userName,setUserLogin,setUserName,setUserEmail,userEmail} = useContext(UserLoginContext)
  const {getLoggedUserCart} = useContext(CartContext)


  const [signinError, setSigninError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate =useNavigate();





  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('email pattern is inavalid').required('email is required'),
    password:Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/,'password pattern is inavalid').required('password is required'),

  });




 function handleLogin(formValues){

  setIsLoading(true)
 console.log(formValues);
  
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formValues).then(
    (response)=>{
      setIsLoading(false)
      console.log('hi' ,response);

      localStorage.setItem('userToken',response.data.token)
      setUserLogin(response.data.token)
      setUserName(formValues.name)

      localStorage.setItem('userEmail',response.data.user.email)
      getLoggedUserCart()
      navigate('/')

    

    }
 ).catch(
 (error)=>{
      setIsLoading(false)
      console.log(error);
      console.log(error.response.data.message);
      setSigninError(error?.response?.data?.message)
    }

 )

 

}


let formik = useFormik({
  initialValues:{
  
    email:"",
    password:"",
   
  },
  validationSchema:SignupSchema,
  onSubmit:handleLogin,

});


const isAnyInputEmpty = !formik.values.email || !formik.values.password;



  return <>
  
  <div className=' py-20'>
<h2 className='text-green-400 font-bold text-3xl text-center my-5'>Login Now</h2>
 
    {signinError ?(<div className="p-4 text-center w-3/4 mx-auto mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {signinError}</div> ): null}

<form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
 



  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}</div> ): null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password && formik.touched.password ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      

      {formik.errors.password} </div> ): null}
  </div>



<div className=''>

<button
            type="submit"
            className={`block text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-green-500 ${(formik.isValid && !isAnyInputEmpty ) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={!formik.isValid || isAnyInputEmpty}
          >
      {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login Now'}
      
    </button>
<Link to='/forgetpassword' className='block my-2 font-semibold text-xl text-gray-950 transition-all duration-500 hover:text-green-500'>forget your password ?</Link>
<p>Did You Not Have Account yet?<Link to='/register' className=' my-2 font-semibold text-md text-gray-950 transition-all duration-500 hover:text-green-500'>Register Now</Link></p>


</div>


</form>


</div>
  </>
}
