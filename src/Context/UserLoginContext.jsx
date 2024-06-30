import { createContext, useEffect, useState } from "react";


export let UserLoginContext=  createContext(0)



export default function UserLoginContextProvider(props){

const [userLogin, setUserLogin] = useState(null)
const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState(null)


useEffect(() => {

    if (localStorage.getItem('userToken')!==null) {
        setUserLogin(localStorage.getItem('userToken'))
    }

  
  
}
, []);


return(
<>
   

    <UserLoginContext.Provider value={{userLogin,userName , setUserLogin ,setUserName,setUserEmail,userEmail}} >
    {props.children}
    </UserLoginContext.Provider>


    </>
    )

}




