import { graphs, useNetworkStore } from '@/store/networks'
import { Button, List, ListItem, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'

export default function NetworkList() {
  

  const [networks,selected, setSelected] = useNetworkStore((state)=>[state.networks, state.selected, state.setSelected])
  

  return (
    <MenuOptionGroup type="radio" onChange={(value)=>setSelected(value as string)} defaultValue={selected?.key}>
      {networks.map((network)=>(
        <MenuItemOption 
          as={Button}
          key={network.key} 
          value={network.key}
        >
          {network.attributes.name}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )
}
