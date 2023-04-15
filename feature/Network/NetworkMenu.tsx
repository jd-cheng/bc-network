import { HamburgerIcon, AddIcon, EditIcon, DownloadIcon, SettingsIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Box, Button } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import NetworkImport from './NetworkImport'

export enum NetworkMenuType {
  IMPORT='import',
  EXPORT='export',
  SETTING='setting'
}

export default function NetworkMenu() {

  const [type, setType] = useState<NetworkMenuType | null>(null)

  const onClose = ()=>{
    setType(null)
  }

  const handleImport = (evt: React.ChangeEvent<HTMLInputElement>)=>{
    console.log(evt.target.files?.item(0))

  }

  const handleExport = ()=>{

  }


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
          <MenuItem as={Button} icon={<AddIcon />} onClick={()=>setType(NetworkMenuType.IMPORT)}>
            Import Network
          </MenuItem>
          <MenuItem as={Button} icon={<DownloadIcon/>} >
            Export Network
          </MenuItem>
          <MenuItem as={Button} icon={<SettingsIcon />} >
            Settings 
          </MenuItem>
        </MenuList>
      </Menu>
      <NetworkImport type={type} onClose={onClose}/>
    </Box>
  )
}
