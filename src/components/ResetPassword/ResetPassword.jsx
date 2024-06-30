
import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Loder from '../Loder/Loder';
import { UserLoginContext } from '../../Context/UserLoginContext';




export default function ResetPassword() {

  const [Loading, setLoading] = useState(false)
  const [codeError, setCodeError] = useState('')
  const {userLogin,setUserLogin,userName} = useContext(UserLoginContext)
let navigate=useNavigate()


  const ResetSchema = Yup.object().shape({
    email: Yup.string().email('email pattern is inavalid').required('email is required'),
    newPassword:Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/,'password pattern is inavalid').required('password is required'),
  });

  
let formik = useFormik({
  initialValues:{
    email:"",
    newPassword:"",
   
   
  },
  validationSchema:ResetSchema,
  onSubmit:handleNewPass,

});

function handleNewPass(formvalues){

console.log(formvalues.resetCode);
setLoading(true)
  
axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
  email:formvalues.email,
  newPassword:formvalues.newPassword
}).then(
  (response)=>{
    // console.log('hi' ,response);
    setLoading(false)

   
    localStorage.removeItem('userToken');
    localStorage.setItem('userToken',response.data.token)
    setUserLogin(localStorage.getItem('userToken'))
      // console.log('new Nav',userLogin);
      
    navigate('/')
    
   

  

  }
).catch(
(error)=>{
  setLoading(false)
  console.log(error.response.data.message);
  setCodeError(error.response)
   
  }

)




}

const isAnyInputEmpty = !formik.values.email|| !formik.values.newPassword;






  return <>
  
  {Loading ? <Loder/> :null}

  <h2 className='font-semibold text-2xl text-green-600'>reset your account password</h2>


  <form className="max-w-2xl mx-auto my-5" onSubmit={formik.handleSubmit}>
 



 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
     <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email </label>
     {formik.errors.email && formik.touched.email ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {formik.errors.email}</div> ): null}
     
 </div>
 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
     <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter new Password </label>
     {formik.errors.newPassword && formik.touched.newPassword ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {formik.errors.newPassword}</div> ): null}
     
 </div>





<div className=''>

<button
           type="submit"
           className={`block text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-green-500 ${(formik.isValid && !isAnyInputEmpty ) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
           disabled={!formik.isValid || isAnyInputEmpty}
         >
    
        Reset Password
     
   </button>

</div>


</form>

{codeError!=""? (<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {codeError}</div> ):null}
  
  </>
}