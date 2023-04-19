import { buildNetwork } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { 
  Button,  
  Menu, 
  MenuButton, 
  MenuItemOption, 
  MenuList, 
  MenuOptionGroup, 
  Select} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function BCuilder() {
  

  const [network,setNetwork] = useNetworkStore((state)=>[state.selected, state.setSelected])
  const node = useNodeStore((state)=>state.selected)
  const [builderType, setBuilderType] = useState<NetworkType>()
  
  const handleBuilderType = (nextType:NetworkType)=>{
    console.log('build network', nextType)
    setBuilderType(builderType === nextType? undefined: nextType)
  }

  useEffect(()=>{
    if(!network || !node) { return }

    if(builderType){
      buildNetwork(network, builderType, node.key)
      setNetwork({...network})
    } 

    return ()=>{
      console.log('unmount network builder')
    }
  }, [node])

  
  return (
    <Select variant="filled" placeholder='Select Type'>
      {networkTypes.map((type)=>(
        <option value={type.value}>{type.text}</option>
      ))}
    </Select>
  )
}
