import { buildNetwork } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function BCuilder() {
  
  const [network,updateSelected, updateNetwork] = useNetworkStore((state)=>[state.selected, state.updateSelected,state.updateNetwork])
  const node = useNodeStore((state)=>state.selected)
  const [type, setType] = useState<NetworkType>()
  
  const handleType = (evt: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(evt)
    const nextType = evt.target.value as NetworkType
    setType(type === nextType? undefined: nextType)
  }

  useEffect(()=>{
    if(!network || !node) { return }

    if(type){
      buildNetwork(network, type, node.key)
      updateSelected({...network.attributes, type})
      updateNetwork(network.key, {...network.attributes, type})
      
    } 

    return ()=>{
      console.log('unmount network builder')
    }
  }, [node, type])

  
  return (
    <Select variant="filled" placeholder='Select Type' value={type} onChange={handleType}>
      {networkTypes.map((type)=>(
        <option value={type.value}>{type.text}</option>
      ))}
    </Select>
  )
}
