import React, { HTMLProps } from 'react'

interface IProp extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}


export default function ListItem({children, ...prop}:IProp) {
  return (
    <div 
      className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6" 
     {...prop}
    >
      {children}
    </div>
  )
}
