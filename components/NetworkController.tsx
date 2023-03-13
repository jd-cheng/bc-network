import { 
  createHypercube, 
  createCrossedcube } from '@/lib/network'
import { sigma } from '@/lib/sigma'

import { useState } from 'react'



export default function NetworkController() {

  const { render } = sigma
  const [network, setNetwork] = useState<string>('hyper')
  const [networkDimension, setNetworkDimension] = useState<string>('')

  const handleNetwork = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    if (!render){ return }

    const networkType = evt.target.value
    switch(networkType){
      case 'hyper': 
        render.setGraph(createHypercube())
        break
      case 'crossed': 
        render.setGraph(createCrossedcube())
        break
      case 'twisted': 
        render.setGraph(createCrossedcube())
        break
    }
    setNetwork(networkType)
  }

  const handleNetworkDimension = (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    if (!render){ return }

    const networkDimension = evt.target.value
    
    // switch(networkDimension){
    //   case 'hyper': 
    //     sigma.setGraph(createHypercube())
    //     break
    //   case 'crossed': 
    //     sigma.setGraph(createCrossedcube())
    //     break
    //   case 'twisted': 
    //     sigma.setGraph(createCrossedcube())
    //     break
    // }

    setNetworkDimension(networkDimension)
  }


  return (
    <div>
      <p> current network type {network}</p>
      <label>choose network type</label>
      <select value={network} onChange={handleNetwork}>
        <option value='hyper'> hypercube </option>
        <option value='crossed'> crossed cube </option>
        <option value='twisted'> locally twisted cube </option>
      </select>
      <p> current network dimension {networkDimension}</p>
      <label>choose network dimension</label>
      <select value={networkDimension} onChange={handleNetworkDimension}>
      {['1','2','3','4'].map(val =>
          <option key={val} value={val}> {val} </option>
        )}
      </select>
    </div>
  )
}
