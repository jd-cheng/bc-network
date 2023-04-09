import { DeleteIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, IconButton, ListItem, Text } from '@chakra-ui/react'
import React, { HTMLProps } from 'react'

interface IProp extends HTMLProps<HTMLDivElement> {
  onOpen: ()=>void
  onDelete: ()=>void
  isEdit: boolean
  children?: React.ReactNode
}

export default function NetworkItem({onOpen, onDelete, isEdit, children, ...prop}:IProp) {
  return (
    <ListItem>
      <ButtonGroup w={'100%'}>
        <Button variant='ghost' w={'100%'} onClick={onOpen}>
          {children}
        </Button>
      { isEdit &&
        <IconButton 
          aria-label='delete network' 
          icon={<DeleteIcon/>} 
          onClick={onDelete}
        />
      }
        </ButtonGroup>
    </ListItem>
  )
}
