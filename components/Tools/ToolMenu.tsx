import { useToolbarStore } from '@/store/tools'
import { HamburgerIcon, AddIcon, DownloadIcon, EditIcon, DragHandleIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Button, Box, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import React from 'react'

export default function ToolMenu() {

  const [tools,selected, setSelected] = useToolbarStore((state)=>[state.tools, state.selected,state.setSelected])

  const handleTool = (newTool:string | string[])=>{
    console.log('select tool')
    if(newTool instanceof Array){
      console.log('invalid value')
      return
    }
    setSelected(newTool)
  }

  return (
    <Box position='fixed' top='16px' right='16px' zIndex='popover'>
      <Menu matchWidth isLazy closeOnSelect={false}>
        <MenuButton as={Button} minWidth='240px' variant='outline' rightIcon={<ChevronDownIcon/>}>
          {selected? selected: "Select Tool"}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup onChange={handleTool} type="radio">
            {tools.map((tool)=>(
              <MenuItemOption as={Button} key={tool} value={tool}> {tool} </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  )
}
