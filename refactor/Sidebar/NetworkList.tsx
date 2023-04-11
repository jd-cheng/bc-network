import { INetwork, useNetworkStore } from '@/store/networks'
import { useSidebarState } from '@/store/sidebar'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, DrawerBody, DrawerFooter, DrawerHeader, Flex, Heading, IconButton, List, ListItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { normalHeight } from '../../components/Header/Header'
import NetworkItem from './NetworkItem'



export default function NetworkList() {
  console.log('render network list')
  const [networks, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.deleteNetwork, state.setSelected])
  const setType = useSidebarState((state)=>state.setType)
  const [isEdit, setEdit] = useState(false)

  const handleOpen = (network: INetwork)=>{
    console.log('click', network)
    openNetwork(network)
  }

  const handleDelete = (index: number)=>{
    console.log('delete', index)
    deleteNetwork(index)
  }

  const handleEdit = ()=>{
    setEdit(isEdit?false:true)
  }

  return (
    <>
      <DrawerHeader borderBottomWidth='1px' height={normalHeight}>
        <Flex align='center'>
          <Heading size="lg" textAlign="center" mx='auto'>
              Network List
            </Heading>
            <IconButton 
              aria-label='edit' 
              icon={<EditIcon/>}
              onClick={handleEdit}
            />
        </Flex>
      </DrawerHeader>
      <DrawerBody>
        <List flex='1 1 auto' >
          {networks.map((network, index)=>(
            <NetworkItem 
              key={network.key}
              onOpen={()=>handleOpen(network)}
              onDelete={()=>handleDelete(index)}
              isEdit={isEdit}
            >
              {network.key}
            </NetworkItem>
          ))}
        </List>
      </DrawerBody>
      <DrawerFooter borderTopWidth='1px' height={normalHeight}>
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
