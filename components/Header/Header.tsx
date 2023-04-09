import { useSidebarState } from '@/store/sidebar'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'

export default function Header() {

  const [isOpen, onOpen] = useSidebarState((state)=>[state.isOpen, state.onOpen])

  return (
    <Flex 
      direction='row' 
      w='100%' h='56px'  px='32px'
      bgColor="black" 
      justify='space-between'
      align='center'
    >
      <IconButton 
        variant='outline'
        aria-label='menu' 
        icon={<HamburgerIcon/>} 
        onClick={onOpen}
        colorScheme="whiteAlpha"
      />
      <Heading textColor='white' size='lg'>
        BC Network
      </Heading>
      <div></div>
    </Flex>

  )
}
