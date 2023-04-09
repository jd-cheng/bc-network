import { useSidebarState } from '@/store/sidebar'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'

export const normalHeight = '56px'

export default function Header() {

  const onOpen = useSidebarState((state)=>state.onOpen)

  return (
    <Flex 
      direction='row' 
      w='100%' h={normalHeight}  px='32px'
      bgColor="black" 
      align='center'
      justify='space-between'
    >
      <IconButton 
        variant='outline'
        aria-label='menu' 
        icon={<HamburgerIcon/>} 
        onClick={onOpen}
        colorScheme="whiteAlpha"
        justifySelf='flex-start'
      />
      <Heading textColor='white' size='lg'>
        BC Network
      </Heading>
      <div></div>
    </Flex>

  )
}
