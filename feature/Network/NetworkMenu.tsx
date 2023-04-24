import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuList, Text, Flex, Divider, MenuItem } from '@chakra-ui/react'
import React from 'react'
import AddNetwork from './AddNetwork'
import NetworkList from './NetworkList'

export enum NetworkMenuType {
  ADD='add',
  EXPORT='export',
  SETTING='setting'
}

export default function NetworkMenu() {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        position='fixed' 
        top='16px' 
        left='16px' 
        zIndex='overlay'
        icon={<HamburgerIcon/>}
        aria-label=''
        variant='outline'
      />
      <MenuList>
        <Flex justify="space-between" align="center" mx="3">
          <Text fontWeight="semibold">Networks</Text>
          <AddNetwork/>
        </Flex>
        <Divider/>
        <NetworkList/>
      </MenuList>
    </Menu>
  )
}
