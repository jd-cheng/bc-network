import { buildNetwork } from '@/lib/network'
import { NetworkType, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { AddIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function NetworkBuilder() {
  
  const [builder, setBuilder] = useState<NetworkType>()
  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const dimension = 4

  const handleBuilder = (value:string| string[])=>{
    console.log('build network', value)
    if(!network || !node) {
      console.log('invalid')
      return
    }
    if(value instanceof Array) { 
      console.log('invalid value')
      return
    }
    console.log('valid')

    buildNetwork(network, value, dimension, node?.key)  
    setBuilder(value)

  }



  

  
  return (
    <Stack direction='row' align='center' minWidth='240px' justify='space-between'>
        
        <Text  flexGrow='1' textAlign='center'>{builder? builder: 'Select Builder'}</Text>
        <Menu>
          <MenuButton as={IconButton}  icon={<AddIcon/>} size='sm'>
          </MenuButton>
          <MenuList >
            <MenuOptionGroup value={builder} onChange={handleBuilder}>
              <MenuItemOption value={NetworkType.HYPER}> hypercube </MenuItemOption>
              <MenuItemOption value={NetworkType.CROSSED}> crossedcube </MenuItemOption>
            </MenuOptionGroup>

          </MenuList>
        </Menu>
    </Stack>

  )
}
