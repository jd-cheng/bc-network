import NetworkBuilder from '@/feature/NetworkBuilder'
import { useToolStore } from '@/store/tools'
import {  ChevronDownIcon, ChevronLeftIcon,  } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Button, Box, MenuItemOption, MenuOptionGroup, Flex } from '@chakra-ui/react'
import React from 'react'
import ToolPanel from './ToolPanel'

export default function ToolMenu() {

  const [tools,selected, setSelected] = useToolStore((state)=>[state.tools, state.selected,state.setSelected])

  const handleTool = (newTool:string | string[])=>{
    console.log('select tool')
    if(newTool instanceof Array){
      console.log('invalid value')
      return
    }
    setSelected(newTool)
  }

  return (
    <Box           
      position='fixed' 
      top='16px' 
      right='16px' 
      zIndex='popover'
    >
      <Menu matchWidth isLazy closeOnSelect={false} placement="left-start">
        <MenuButton as={Button} minWidth='240px' variant='outline' leftIcon={<ChevronLeftIcon/>}       

        >
          {selected? selected: "Select Tool"}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup onChange={handleTool} type="radio">
            {tools.map((tool)=>(
              <MenuItemOption as={Button} key={tool} value={tool} size='sm'> {tool} </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <ToolPanel/>
    </Box>


  )
}
