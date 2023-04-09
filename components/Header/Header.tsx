import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'

export default function Header() {
  return (
    <Flex direction='row' >
      <IconButton aria-label='menu' icon={<HamburgerIcon/>}/>
      <Heading>
        BC Network
      </Heading>
    </Flex>

  )
}
