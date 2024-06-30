import { createContext, useState } from "react";


export let LoadingContext=  createContext(0)



export default function LoadingContextProvider(props){

const [Loading, setLoading] = useState(false)


return(

    <LoadingContext.Provider value={{Loading , setLoading}} >
    {props.children}
    </LoadingContext.Provider>
    
    )

}




