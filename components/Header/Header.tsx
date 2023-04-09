import { useSidebarState } from '@/store/sidebar'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'

export default function Header() {

  const [isOpen, onOpen] = useSidebarState((state)=>[state.isOpen, state.onOpen])
  
  return (
    <Flex direction='row' >
      <IconButton 
        aria-label='menu' 
        icon={<HamburgerIcon/>} 
        onClick={onOpen}
      />
      <Heading>
        BC Network
      </Heading>
      <IconButton aria-label='menu' icon={<HamburgerIcon/>}/>
    </Flex>

  )
}
