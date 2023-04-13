import { buildNetwork } from '@/lib/network'
import { NetworkType, networkTypes, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { AddIcon } from '@chakra-ui/icons'
import { Button, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function NetworkBuilder() {
  
  const [type, setType] = useState<NetworkType>()
  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const dimension = 4

  const handleBuilder = (nextType:NetworkType)=>{
    console.log('build network', nextType)
    if(!network || !node) {
      console.log('invalid')
      return
    }

    buildNetwork(network, nextType, dimension, node?.key)  
    setType(nextType)

  }
  
  return (

    <Menu>
      <MenuButton as={Button}  leftIcon={<AddIcon/>} minWidth='240px'>
        {type? type: 'Select Type' }
      </MenuButton>
      <MenuList >
        <MenuOptionGroup value={type} type="radio">
          {networkTypes.map((type)=>(
            <MenuItemOption 
              key={type}
              value={type}
              onClick={()=>handleBuilder(type)}
            >
              {type}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

      </MenuList>
    </Menu>
  )
}
