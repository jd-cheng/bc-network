import { 
  IconButton, 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
  Stack, 
  useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {  RxDashboard as ToolbarIcon } from "react-icons/rx";
import { useNetworkStore } from '@/store/networks';
import Editors from './Editors';
import Builders from './Builders';




export default function ToolMenu() {

  const network = useNetworkStore((state)=>state.selected)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    network?onOpen():onClose()
  },[network])

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
          onClick={onToggle}
          isDisabled={!network}
        />
      </PopoverTrigger>
      <PopoverContent width="min-content" px="3" py="2">
        <Stack direction="column" spacing="2">
          <Editors/>
          <Builders/>
        </Stack>
      </PopoverContent>
    </Popover> 
  )
}
