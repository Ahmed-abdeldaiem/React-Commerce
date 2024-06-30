import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Loder from '../Loder/Loder';




export default function ForgetPassword() {

  const [Loading, setLoading] = useState(false)
let navigate=useNavigate()


  const ForgetSchema = Yup.object().shape({
    email: Yup.string().email('email pattern is inavalid').required('email is required'),

  });

  
let formik = useFormik({
  initialValues:{
  
    email:"",
   
   
  },
  validationSchema:ForgetSchema,
  onSubmit:handleEmail,

});

function handleEmail(formvalues){

// console.log(formvalues.email);
setLoading(true)
  
axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
  email:formvalues.email
}).then(
  (response)=>{
    // console.log('hi' ,response);
    setLoading(false)

 
    navigate('/verify-code')
    
   

  

  }
).catch(
(error)=>{
    setIsLoading(false)
    console.log(error);
    // console.log(error.response.data.message);
   
  }

)




}

const isAnyInputEmpty = !formik.values.email;






  return <>
  
  {Loading ? <Loder/> :null}

  <h2 className='font-semibold text-2xl text-green-600'>please enter your verification code</h2>


  <form className="max-w-2xl mx-auto my-5" onSubmit={formik.handleSubmit}>
 



 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
     <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
     {formik.errors.email && formik.touched.email ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {formik.errors.email}</div> ): null}
 </div>





<div className=''>

<button
           type="submit"
           className={`block text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-green-500 ${(formik.isValid && !isAnyInputEmpty ) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
           disabled={!formik.isValid || isAnyInputEmpty}
         >
    
        verify
     
   </button>

</div>


</form>


  
  </>
}
