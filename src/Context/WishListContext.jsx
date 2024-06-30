import { createContext, useState } from "react";
import axios from 'axios';


export let WishListContext=  createContext()



export default function WishListContextProvider(props){


// const [Loading, setLoading] = useState(false)

let headers = {
    token: localStorage.getItem('userToken')
}

function getLoggedUserWishList(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers
    })
    .then((data)=>{
        // console.log(data);
        return data
    })
    .catch((error)=>{
        console.log(error);
        // if (error.response.data.statusMsg=='fail') {
        //     return 'No cart exist for this user'
            
        // }
    })
}
function addProductToWishList(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
        productId:productId
    },{
        headers
    })
    .then((data)=>data)
    .catch((error)=>{
       
        console.log(error);
    })
}



function removeWishListItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers
    })
    .then((data)=>{
        console.log(data);
        return data
    })
    .catch((error)=>{
       
        console.log(error);
    })
}




return(

    <WishListContext.Provider value={{addProductToWishList,removeWishListItem,getLoggedUserWishList}} >
    {props.children}
    </WishListContext.Provider>
    
    )

}




