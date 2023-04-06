import React, { useState } from 'react'

export default function Dimension() {

  const [dimension, setDimension] = useState<number>()

  const handleDimension = (evt: React.ChangeEvent<HTMLSelectElement>)=>{
    const d =  evt.target.value
    console.log(d)
    setDimension(parseInt(d))
  }
  
  return (
    <div>
      <h1>Dimension</h1>
      <select value={dimension}  onChange={handleDimension}>
        {[1,2,3,4].map((d)=>(
          <option key={d}>{d}</option>
        ))}
      </select>
    </div>
  )
}
