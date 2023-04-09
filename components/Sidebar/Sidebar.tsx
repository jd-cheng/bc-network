import { INetwork, useNetworkStore } from '@/store/networks'
import React from 'react'
import AddNetwork from './AddNetwork'
import NetworkItem from './NetworkItem'
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, List } from '@chakra-ui/react'
import { useSidebarState } from '@/store/sidebar'




export default function Sidebar() {
  const [networks, addNetwork, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.addNetwork, state.deleteNetwork, state.openNetwork])
  const [isOpen, onClose] = useSidebarState((state)=>[state.isOpen, state.onClose])

  const handleClick = (network: INetwork)=>{
      console.log('click', network)
      openNetwork(network)
  }

  const handleDelete = (index: number)=>{
    console.log('delete', index)
    deleteNetwork(index)
  }

  return (
    <Drawer 
      placement='right'
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader>
          <Heading p={1}>BC Network</Heading>

        </DrawerHeader>
        <DrawerBody>
          <List flex='1 1 auto'>
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
        <DrawerFooter>
          <AddNetwork/>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
