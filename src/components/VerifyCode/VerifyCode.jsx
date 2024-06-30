import React, { useState } from 'react'
import style from './VerifyCode.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Loder from '../Loder/Loder';




export default function VerifyCode() {

  const [Loading, setLoading] = useState(false)
  const [codeError, setCodeError] = useState('')
let navigate=useNavigate()


  const ResetSchema = Yup.object().shape({
    resetCode: Yup.string().min(6, 'Code min length is 6').max(6, 'Max code length is 6').required('code is required'),
  });

  
let formik = useFormik({
  initialValues:{
  
    resetCode:"",
   
   
  },
  validationSchema:ResetSchema,
  onSubmit:handleCode,

});

function handleCode(formvalues){

// console.log(formvalues.resetCode);
setLoading(true)
  
axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
  resetCode:formvalues.resetCode
}).then(
  (response)=>{
    // console.log('hi' ,response);
    setLoading(false)

   

    navigate('/reset-password')
    
   

  

  }
).catch(
(error)=>{
  setLoading(false)
  console.log(error.response.data.message);
  setCodeError('code is invalid')
   
  }

)




}

const isAnyInputEmpty = !formik.values.resetCode;






  return <>
  
  {Loading ? <Loder/> :null}

  <h2 className='font-semibold text-2xl text-green-600'>please enter your verification code</h2>


  <form className="max-w-2xl mx-auto my-5" onSubmit={formik.handleSubmit}>
 



 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
     <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the code</label>
     {formik.errors.resetCode && formik.touched.resetCode ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {formik.errors.resetCode}</div> ): null}
     {codeError!=""? (<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {codeError}</div> ):null}
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