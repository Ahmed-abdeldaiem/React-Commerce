import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserLoginContext } from '../../Context/UserLoginContext';



export default function Register() {

  const {userLogin,userName,setUserLogin,setUserName} = useContext(UserLoginContext)
  const [signupError, setSignupError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate =useNavigate();





  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, 'name min length is 3').max(30, 'Name is Too Long!').required('name is required'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid Phone').required('phone is required'),
    email: Yup.string().email('email pattern is inavalid').required('email is required'),
    password:Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/,'Must be+* start with a letter (either uppercase or lowercase)+* be between 6 and 9 characters in total+* can only contain letters (A-Z or a-z) and numbers (0-9)').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and Repassword must be the same').required('rePassword is required')

  });




 function handleRegister(formValues){

  setIsLoading(true)
  console.log('register formValues' , formValues);
  
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formValues)
 .then(
    (response)=>{
      setIsLoading(false)
      // console.log(response);
      localStorage.setItem('userToken',response.data.token)
      setUserLogin(response.data.token)
      setUserName(formValues.name)
      // console.log(response.data);
      navigate('/')

    }
 )
 .catch(
 (error)=>{
      setIsLoading(false)
      console.log(error.response.data.message);
      setSignupError(error?.response?.data?.message)
    }

 )

 

}


let formik = useFormik({
  initialValues:{
    name:"",
    phone:"",
    email:"",
    password:"",
    rePassword:"",
  },
  validationSchema:SignupSchema,
  onSubmit:handleRegister,

});



const isAnyInputEmpty = !formik.values.email || !formik.values.password || !formik.values.name || !formik.values.rePassword || !formik.values.phone ;


  return <>
  
  <div className=' py-20'>
<h2 className='text-green-400 font-bold text-3xl text-center my-5'>Register Now</h2>
 
    {signupError ?(<div className="p-4 text-center w-3/4 mx-auto mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {signupError}</div> ): null}

<form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
     
      {formik.errors.name && formik.touched.name ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}</div> ): null}
      
     
    
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
      {formik.errors.phone && formik.touched.phone ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}</div> ): null}
  </div>

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
      

      {formik.errors.password.split('+').map((el,index)=>{
       return  (
        <React.Fragment key={index}>
      {el}
      <br />
    </React.Fragment>
        )
      })}

     
   
      </div> ): null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword</label>
      {formik.errors.rePassword && formik.touched.rePassword ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}</div> ): null}
  </div>





  <button
            type="submit"
            className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-green-500 ${(formik.isValid && !isAnyInputEmpty ) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={!formik.isValid || isAnyInputEmpty}
          >
      {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Regester'}
    
    </button>
</form>



</div>
  </>
}
