"use client"
import { ReactNode } from "react"

const SecondaryButton = ({children , onClick , size= "small"} :{children: ReactNode , onClick:()=>void , size?:"big" | "small"}) => {
  return (
    <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-16 py-4"} hover:shadow-md cursor-pointer border border-black  rounded-full`}>
        {children}
    </div>
  )
}

export default SecondaryButton