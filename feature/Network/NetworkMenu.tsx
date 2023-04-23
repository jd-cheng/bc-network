import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import MenuPanel from './MenuPanel'

export enum NetworkMenuType {
  ADD='add',
  EXPORT='export',
  SETTING='setting'
}

export default function NetworkMenu() {

  const { isOpen, onToggle } = useDisclosure()

  return (
    <Popover placement="bottom-start" isLazy isOpen={isOpen}>
      <PopoverTrigger>
        <IconButton
          position='fixed' 
          top='16px' 
          left='16px' 
          zIndex='overlay'
          icon={<HamburgerIcon/>}
          aria-label=''
          variant='outline'
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent maxW='224px'>
        <MenuPanel/>
      </PopoverContent>
    </Popover> 
  )
}
