import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import Loder from '../Loder/Loder'





export default function Categories() {

const [counter, setcounter] = useState(0)
const [Loading, setLoading] = useState(false)
const [categories, setCategories] = useState([])
const [subCategories, setSubCategories] = useState([])
const [name, setName] = useState('')

let headers = {
  token: localStorage.getItem('userToken')
}


function getAllCategories(){
  setLoading(true)
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories',{
    headers
}).then((AllCats)=>{
  setLoading(false)
  
  // console.log(AllCats.data.data);
  setCategories(AllCats.data.data)

}).catch((error)=>{
  console.log(error);
})
 
}


function getSubCats(catId,name){

  setLoading(true)
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`,{
    headers
}).then((AllSubCats)=>{
  setLoading(false)
  
  // console.log(AllSubCats.data.data);
  setSubCategories(AllSubCats.data.data)
  setName(name)
}).catch((error)=>{
  console.log(error);
})

}

useEffect(() => {
  getAllCategories()

 
}, [])


  return <>
   {Loading ? <Loder/> :null}



  <div className='py-8'>
  <h2 className='text-green-400 text-3xl font-semibold text-center'>Categories</h2>

<div className="row">
      {
        categories.map((cat)=>{
          return <div onClick={()=>getSubCats(cat._id,cat.name)}  className='md:w-1/2 p-3   lg:w-1/3' key={cat._id}>
            <div className=' border-gray-300  border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-600  transition-all duration-500'>
              <img src={cat.image} className="w-full h-[300px] size-fit" alt={cat.name} />
              <h3 className='text-center text-2xl font-semibold text-green-500 py-3'>{cat.name}</h3>
            </div>
          </div>
          
         

        })
      }

</div>

{subCategories.length==0?null:<>
  <h1 className='text-3xl text-green-700 text-center font-semibold'>{name} Sub Categories</h1>
<div className="row">



{subCategories.map((subCat)=>{
    return <div className='md:w-1/2 p-3   lg:w-1/3' key={subCat._id}>
    <div className=' border-gray-300  border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-600  transition-all duration-500'>
      
      <h3 className='text-center text-2xl font-semibold text-green-500 py-3'>{subCat.name}</h3>
    </div>
  </div>
   
  
})}


</div>
    
 


</>}

  </div>
  

  </>
}
