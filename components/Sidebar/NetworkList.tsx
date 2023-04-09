import { INetwork, useNetworkStore } from '@/store/networks'
import { useSidebarState } from '@/store/sidebar'
import { AddIcon } from '@chakra-ui/icons'
import { Button, DrawerBody, DrawerFooter, DrawerHeader, Heading, List } from '@chakra-ui/react'
import React from 'react'
import NetworkItem from './NetworkItem'

export default function NetworkList() {
  const [networks, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.deleteNetwork, state.openNetwork])
  const setType = useSidebarState((state)=>state.setType)

  const handleClick = (network: INetwork)=>{
    console.log('click', network)
    openNetwork(network)
  }

  const handleDelete = (index: number)=>{
    console.log('delete', index)
    deleteNetwork(index)
  }

  return (
    <>
      <DrawerHeader borderBottomWidth='1px'>
        <Heading p={1}>
          Network List
        </Heading>
      </DrawerHeader>
      <DrawerBody>
        <List flex='1 1 auto' w={'100%'}>
          {networks.map((network, index)=>(
            <NetworkItem 
              key={network.key} 
              onClick={()=>handleClick(network)}
              onDelete={()=>handleDelete(index)}
            >
              {network.key}
            </ NetworkItem>
          ))}
        </List>
      </DrawerBody>
      <DrawerFooter borderTopWidth='1px'>
        <Button 
          w={'100%'}
          leftIcon={<AddIcon/>} 
          onClick={()=>setType('form')}
        >
          Add Network
        </Button>
      </DrawerFooter>
    </>

  )
}
