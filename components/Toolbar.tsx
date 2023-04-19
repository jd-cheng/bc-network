import { 
  IconButton, 
  ScaleFade, 
  Stack, 
  useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {  RxDashboard as ToolbarIcon } from "react-icons/rx";
import { useNetworkStore } from '@/store/networks';
import ToolPanel from './ToolPanel';




export default function Toolbar() {

  const network = useNetworkStore((state)=>state.selected)
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack
      position='fixed' 
      top='16px' 
      right='16px' 
      zIndex='overlay'
    >
      <IconButton
        icon={<ToolbarIcon/>}
        aria-label=''
        variant='outline'
        onClick={()=>network&&onToggle()}
      />
      <ScaleFade initialScale={0.9} in={isOpen}>
        <ToolPanel/>
      </ScaleFade>
    </Stack>
    
  )
}
