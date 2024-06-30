import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { UserLoginContext } from "./UserLoginContext";


export let CartContext=  createContext()


export default function CartContextProvider(props){
    const {setUserEmail,userEmail} = useContext(UserLoginContext)


const [Loading, setLoading] = useState(false)
const [cartsNumber, setCartsNumber] = useState(0)
const [checkOut, setCheckOut] = useState(false)
const [user, setUser] = useState()

let headers = {
    token: localStorage.getItem('userToken')
}

function getLoggedUserCart(){
    setUser(userEmail)
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers
    })
    .then((data)=>{
        setCartsNumber(data.data.numOfCartItems);
        setCheckOut(true)
        return data
    })
    .catch((error)=>{
        if (error.response.data.statusMsg=='fail') {
            setCartsNumber(0)
            setCheckOut(false)
            return 'No cart exist for this user'
            
        }
    })
}
function addProductToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:productId
    },{
        headers
    })
    .then((data)=>{

        setCartsNumber(data.data.numOfCartItems)

        return data
    })
    .catch((error)=>{
       
        console.log(error);
    })
}

function updateProductQuantity(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count : count
    },{
        headers
    })
    .then((data)=>data)
    .catch((error)=>{
       
        console.log(error);
    })
}

function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    })
    .then((data)=>
    {

        setCartsNumber(data.data.numOfCartItems)
        return data
    }
    )
    .catch((error)=>{
       
        console.log(error);
    })
}

function removeUserCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    })
    .then((data)=>{
        
        setCartsNumber(0)
        setCheckOut(false)
        return data})
    .catch((error)=>{
       
        console.log(error);
    })
}


return(

    <CartContext.Provider value={{getLoggedUserCart,addProductToCart,updateProductQuantity,removeCartItem,removeUserCart,cartsNumber,setCartsNumber,checkOut,user}} >
    {props.children}
    </CartContext.Provider>
    
    )

}




