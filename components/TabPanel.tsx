import React from 'react'

interface IProp {
  value: string;
  index: string;
  children?: React.ReactNode; 
}

export default function TabPanel({value, index, children}:IProp) {
  return (
    <div style={{
      display: index === value? 'block':'none'
    }}>
      {children}
    </div>
  )
}
