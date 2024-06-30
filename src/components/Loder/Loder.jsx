import React, { useState } from 'react'
import style from './Loder.module.css'
import FadeLoader from 'react-spinners/FadeLoader'




export default function Loder() {

const [counter, setcounter] = useState(0)

  return <>
  
  <div className="bg-gray-400 bg-opacity-40 fixed inset-0 z-30 flex justify-center items-center ">
          <FadeLoader color={"#36d7b7"} loading={true} />
        </div>
  </>
}
