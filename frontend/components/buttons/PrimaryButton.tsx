"use client"
import { ReactNode } from "react"

const PrimaryButton = ({children , onClick , size= "small"} :{children: ReactNode , onClick:()=>void , size?:"big" | "small"}) => {
  return (
    <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-16 py-4"} hover:shadow-md cursor-pointer bg-amber-700 text-white rounded-full text-center flex justify-center flex-col`}>
        {children}
    </div>
  )
}

export default PrimaryButton