import React, { useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Loder from '../Loder/Loder';



export default function CheckOut() {


let {cartId} =useParams()
// const [shippingAddress, setShippingAddress] = useState({})
const [Loading, setLoading] = useState(false)
let headers = {
  token: localStorage.getItem('userToken')
}

  const PaySchema = Yup.object().shape({
    
    details: Yup.string().min(3,'details min length is 3').max(40, 'Name is Too Long!').required('details is required'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'phone is inavalid').required('phone is required'),
    city:Yup.string().min(2, 'invalid city').required('city is required'),

  });
  let formik = useFormik({
    initialValues:{
    
      details:"",
      phone:"",
      city:""
     
    },
    validationSchema:PaySchema,
    onSubmit:handlePay,
  
  });





  function handlePay(formValues){
    console.log(formValues);
    console.log(cartId);
    setLoading(true)
    let baseURL = localStorage.getItem('baseURL')
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseURL}`,{
      shippingAddress:formValues
    },{
      headers
    }).then(
      (response)=>{
        setLoading(false)
        console.log('hi' ,response);
        window.open(response.data.session.url , '_self')
  
      
  
      }
   ).catch(
   (error)=>{
        // setIsLoading(false)
        console.log(error);
        // console.log(error.response.data.message);
      
      }
  
   )


  }

  const isAnyInputEmpty = !formik.values.details || !formik.values.phone ||!formik.values.city;




  return <>
  

  {Loading ? <Loder/> :null}
  <form className="max-w-xl mx-auto py-20" onSubmit={formik.handleSubmit}>
 



 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=""  />
     <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
     {formik.errors.details && formik.touched.details ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     {formik.errors.details}</div> ): null}
 </div>

 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=""  />
     <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
     {formik.errors.phone && formik.touched.phone ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     

     {formik.errors.phone} </div> ): null}
 </div>

 <div className="relative z-0 w-full mb-5 group">
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=""  />
     <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
     {formik.errors.city && formik.touched.city ?(<div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     

     {formik.errors.city} </div> ): null}
 </div>



<div className='text-center flex justify-center'>

<button
           type="submit"
           className={`block text-white font-medium rounded-lg text-sm w-full sm:w-auto px-16 py-2.5 text-center focus:outline-none focus:ring-4 transition-all duration-500 focus:ring-green-400 ${(formik.isValid && !isAnyInputEmpty ) ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-500 cursor-not-allowed'}`}
           disabled={!formik.isValid || isAnyInputEmpty}
         >
     Pay Now
     
   </button>

</div>


</form>







  </>
}
