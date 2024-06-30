import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { LoadingContext } from '../Context/LoadingContext';
import FadeLoader from 'react-spinners/FadeLoader';

export default function useProducts(search) {



    const {Loading , setLoading} = useContext(LoadingContext)
// {data ,isError , isLoading ,isFetching ,refetch}
    let response = useQuery(
        {
          queryKey:['products'],
          queryFn:getProducts,
           staleTime:80000,
          select:(data)=>{
            // let search=formik.values.search;
            // console.log(search);
          
            return data.data.data.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
          }
        }
      )
      
      

      useEffect(() => {
        response.refetch();
      }, [search]);
      


      function getProducts(){
        // console.log('start');
       return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }
      
     

    //   if (response.isLoading) {
    //     return (
    //       <div className="flex justify-center items-center w-screen h-screen my-8">
    //         <FadeLoader color={"#36D7B7"} loading={true} />
    //         <p>Loading...</p>
    //       </div>
    //     );
    //   }
    
    //   if (response.isFetching) {
    //     return (
    //       <div className="flex justify-center items-center w-screen h-screen my-8">
    //         <FadeLoader color={"#36D7B7"} loading={true} />
    //         <p>Fetching data...</p>
    //       </div>
    //     );
    //   }
    
    //   if (response.isError) {
    //     return <div>Error: {error.message}</div>;
    //   }
      

  return (
    response
  )
}
