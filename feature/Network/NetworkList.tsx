import { graphs, useNetworkStore } from '@/store/networks'
import { Button, List, ListItem } from '@chakra-ui/react'
import React from 'react'

export default function NetworkList() {
  

  const [networks,selected, setSelected] = useNetworkStore((state)=>[state.networks, state.selected, state.setSelected])
  
  return (
    <List>
      {networks.map((network)=>(
        <ListItem 
          key={network.key} 
          as={Button}
          onClick={()=>setSelected(network.key)}
          width="full"
          justifyContent='flex-start'
          isActive={selected?.key === network.key}
        >
          {network.attributes.name}
        </ListItem>
      ))}
    </List>
  )
}
