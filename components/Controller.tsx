import { ReactNode, useState } from "react"
import styles from './Controller.module.css'

export default function Controller(){

  const [type, setType] = useState<string>('hyper')
  const [dimension, setDimension] = useState<string>('4')

  const handleChangeType = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(evt.target.value)
    setType(evt.target.value)

  }

  const handleChangeDimension = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(evt.target.value)
    setDimension(evt.target.value)

  }


  return(
      <div className={styles.controller}>
        <div className={styles.header}>
          BC Network
        </div>
        <div className={styles.network_controller}>
          <p> current network type {}</p>
          <label>choose network type</label>
          <select value={type} onChange={handleChangeType}>
            <option value='hyper'> hypercube </option>
            <option value='crossed'> crossed cube </option>
            <option value='twistes'> locally twisted cube </option>
          </select>
          <div className="network-dimension-select">
            select network dimension
          </div>
        </div>
        <div className={styles.node_controller}>

        </div>
      </div>

  )

}