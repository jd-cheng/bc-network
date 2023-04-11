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


  
  const handleChange = (value:string | string[])=>{
    console.log('select network')
    //radio type menu only accept string
    if( value instanceof Array) {
      console.log('invalid value')
      return
    }

    const index = parseInt(value)

    if(index< 0 || index>= networks.length){
      console.log('invalid index')
      return
    }
    const nextNetwork = networks[index]
    setSelected(nextNetwork)

  }

  return (
  <Box       
    position='fixed'
    top='16px'
    left="50%"
    transform= 'translateX(-50%)'
    zIndex='popover'
  >
    <Menu matchWidth isLazy>
      <MenuButton as={Button} minWidth='240px' variant='outline' rightIcon={<ChevronDownIcon/>}>
        {selected? selected.key: "BC Network"}
      </MenuButton>
      <MenuList >
        <MenuOptionGroup type='radio' onChange={handleChange} >
          {networks.map((network, index)=>(
            <MenuItemOption 
              key={network.key} 
              value={index.toString()} 
              as={Button}
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
