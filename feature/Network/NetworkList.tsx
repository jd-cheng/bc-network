import { 
  Box, 
  Button, 
  Menu, 
  MenuButton, 
  MenuItemOption, 
  MenuList, 
  MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'
import { useNetworkStore } from '@/store/networks'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function NetworkList() {
  const [networks, selected, setSelected] = useNetworkStore(
    (state)=>[state.networks, state.selected, state.setSelected]
  )

  const handleNetwork = (key:string)=>{
    const nextNetwork = networks.find((network)=>network.key === key)
    nextNetwork &&setSelected(nextNetwork.key === selected?.key? null: nextNetwork)
  }

  return (
  <Box       
    position='fixed'
    top='16px'
    left="50%"
    transform= 'translateX(-50%)'
    zIndex='overlay'
  >
    <Menu matchWidth isLazy closeOnSelect={false}  >
      <MenuButton as={Button} minWidth='320px' variant="outline" rightIcon={<ChevronDownIcon/>} zIndex="popover" >
        {selected? selected.graph.getAttribute('name'): "BC Network"}
      </MenuButton>
      <MenuList  >
        <MenuOptionGroup type="radio" value={selected?.key}>
          {networks.map((network)=>(
            <MenuItemOption 
              key={network.key} 
              value={network.key}
              as={Button}
              onClick={()=>handleNetwork(network.key)}
            >
              {network.graph.getAttribute('name')}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  </Box>



  )
}
