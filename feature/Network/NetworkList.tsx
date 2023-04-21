import { graphs, useNetworkStore } from '@/store/networks'
import { Button, List, ListItem } from '@chakra-ui/react'
import React from 'react'

export default function NetworkList() {
  

  const [networks, selected, setSelected] = useNetworkStore(
    (state)=>[state.networks, state.selected, state.setSelected]
  )
  
  return (
    <List>
      {networks.map((network)=>(
        <ListItem 
          key={network} 
          as={Button}
          onClick={()=>setSelected(network)}
          width="full"
          justifyContent='flex-start'
        >
          {graphs.get(network)?.getAttribute('name')}
        </ListItem>
      ))}
    </List>
  )
}
