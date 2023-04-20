import { useNetworkStore } from '@/store/networks'
import { Button, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'

export default function NetList() {

  const [networks, selected, setSelected] = useNetworkStore(
    (state)=>[state.networks, state.selected, state.setSelected]
  )
  
  return (
    <MenuOptionGroup type="radio" value={selected} title='Networks'>
      {networks.map((network)=>(
        <MenuItemOption 
          key={network.key} 
          value={network.key}
          as={Button}
          onClick={()=>setSelected(network.key)}
        >
          {network.attributes.name}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )
}
