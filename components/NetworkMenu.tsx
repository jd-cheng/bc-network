import { HamburgerIcon, AddIcon, EditIcon, DownloadIcon, SettingsIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Box, Button } from '@chakra-ui/react'
import React from 'react'

export default function NetworkMenu() {
  return (
    <Box position='fixed' top='16px' left='16px' zIndex='popover'>
      <Menu >
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        />
        <MenuList>
          <MenuItem as={Button} icon={<AddIcon />} >
            Import Network
          </MenuItem>
          <MenuItem as={Button} icon={<DownloadIcon/>} >
            Export Network
          </MenuItem>
          <MenuItem as={Button} icon={<EditIcon />} >
            Edit Network
          </MenuItem>
          <MenuItem as={Button} icon={<SettingsIcon />} >
            Network Settings 
          </MenuItem>
        </MenuList>
      </Menu>

    </Box>
  )
}
