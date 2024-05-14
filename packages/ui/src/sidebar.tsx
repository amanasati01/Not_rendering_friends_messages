'use client'
import { useRouter } from 'next/navigation'
import { type } from 'os'
import React from 'react'
type propType = {
    name : string,
    icon : React.ReactNode,
    navigationPath :string
}
 export  function SideBar({name ,icon ,navigationPath}:propType){
    const router = useRouter()

    return(
        <div onClick={()=>{
            router.push(navigationPath)
        }} className="cursor-pointer m-2 mt-10 ml-3 h-16 flex justify-center items-center border bg-gray-200 rounded-xl ">
           {icon}
            
            <div className="ml-1 text-xl hidden md:block">
                {name}
            </div>
           
        </div>
    )
}