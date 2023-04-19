import { 
  IconButton, 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
  useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {  RxDashboard as ToolbarIcon } from "react-icons/rx";
import { useNetworkStore } from '@/store/networks';
import ToolPanel from './ToolPanel';




export default function Toolbar() {

  const network = useNetworkStore((state)=>state.selected)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  return (
    <Popover placement="bottom-start" closeOnBlur={false} isLazy isOpen={isOpen}>
      <PopoverTrigger>
        <IconButton
          position='fixed' 
          top='16px' 
          right='16px' 
          zIndex='overlay'
          icon={<ToolbarIcon/>}
          aria-label=''
          variant='outline'
          onClick={()=>network&&onToggle()}
        />
      </PopoverTrigger>
      <PopoverContent maxW='224px'>
        <ToolPanel/>
      </PopoverContent>
    </Popover> 
  )
}
