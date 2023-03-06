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
      <div className={styles.main}>
        <div className={styles.header}>
          BC Network
        </div>
        <div className={styles.network_controller}>
          <p> current network type {type}</p>
          <label>choose network type</label>
          <select value={type} onChange={handleChangeType}>
            <option value='hyper'> hypercube </option>
            <option value='crossed'> crossed cube </option>
            <option value='twistes'> locally twisted cube </option>
          </select>
          <p> current network dimension {dimension}</p>
          <label>choose network dimension</label>
          <select value={dimension} onChange={handleChangeDimension}>
            <option value='1'> 1 dimension </option>
            <option value='2'> 2 dimension</option>
            <option value='3'> 3 dimension</option>
            <option value='4'> 4 dimension</option>
          </select>
        </div>
        <div className={styles.node_controller}>

        </div>
      </div>
  )

}