import React, { useEffect, useRef, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import Loder from '../Loder/Loder'
import { Modal } from 'flowbite-react';


export default function Brands() {


  const [Loading, setLoading] = useState(false)
const [brands, setBrands] = useState([])
const [selectedBrand, setSelectedBrand] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const modalRef = useRef(null);

  let headers = {
    token: localStorage.getItem('userToken')
}


 function getAllBrands(){
  setLoading(true)
   return axios.get('https://ecommerce.routemisr.com/api/v1/brands',{
    headers
}).then((Allbrands)=>{
  setLoading(false)
  
  console.log(Allbrands);
  setBrands(Allbrands.data.data)

}).catch((error)=>{
  console.log(error);
})
 
}
 function getSpecificBrand(brandId){
  setLoading(true)
   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
   .then((brand)=>{
  setLoading(false)
  
  // console.log(brand.data.data);
  setSelectedBrand(brand.data.data);
  setIsModalOpen(true);
}).catch((error)=>{
  console.log(error);
})
 
}




useEffect(() => {
  
  getAllBrands()

 
}, [])




  return <>
  
  {Loading ? <Loder/> :null}

  <div className='py-8'>
  <h2 className='text-green-400 text-3xl font-semibold text-center'>All Brands</h2>

<div className="row">
      {
        brands.map((brand)=>{
          return <button data-modal-target="brand-modal" data-modal-toggle="brand-modal" className='md:w-1/2 p-3  lg:w-1/4' key={brand._id}>
            <div onClick={()=>getSpecificBrand(brand._id)} className='p-2 border-gray-300 rounded-lg border  hover:shadow-md hover:shadow-green-600  transition-all duration-500'>
              <img src={brand.image} className="w-full" alt={brand.name} />
              <h3 className='text-center text-2xl'>{brand.name}</h3>
            </div>
          </button>
          
         

        })
      }

</div>

  </div>
  




  {selectedBrand && (
        <Modal id='brandModal' onClick={(e)=>{
        
          // console.log(document.querySelector('#brandModal .relative'),e.target);
          if (!document.querySelector('#brandModal .relative').contains(e.target)) {
           
            setIsModalOpen(false);
          }
        
          
        }} show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            
          </Modal.Header>
          <Modal.Body>
            <div className='flex '>
            <div className='w-1/2'>
            <p className=" leading-relaxed text-green-500 font-semibold text-3xl">
              {selectedBrand.name}
            </p>
            <h4>{selectedBrand.slug}</h4>
            </div>
            <div className='w-1/2'>
            <img src={selectedBrand.image} className="w-1/2" alt={selectedBrand.name} />
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-white transition-all duration-500 bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

  </>

    }