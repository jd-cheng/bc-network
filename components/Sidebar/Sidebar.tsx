import React from 'react'
import { 
  Drawer, 
  DrawerContent, 
  DrawerOverlay } from '@chakra-ui/react'
import { useSidebarState } from '@/store/sidebar'
import NetworkForm from './NetworkForm'
import NetworkList from './NetworkList'




export default function Sidebar() {
  console.log('render sidebar')
  const [isOpen, type, onClose] = useSidebarState((state)=>[state.isOpen, state.type, state.onClose])

  return (
    <Drawer 
      placement='left'
      isOpen={isOpen}
      onClose={onClose}
      size='xs'
    >
      <DrawerOverlay/>
      <DrawerContent>
        {type === 'list'? <NetworkList/> : <NetworkForm/>}
      </DrawerContent>
    </Drawer>

  )
}
