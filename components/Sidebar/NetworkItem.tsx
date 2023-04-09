import { DeleteIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, IconButton, ListItem, Text } from '@chakra-ui/react'
import React, { HTMLProps } from 'react'

interface IProp extends HTMLProps<HTMLDivElement> {
  onDelete: ()=>void
  children?: React.ReactNode
}

export default function NetworkItem({onDelete, children, ...prop}:IProp) {
  return (
    <ListItem >
      <ButtonGroup>
        <Button variant='ghost' w={'100%'}>
          {children}
        </Button>
        <IconButton aria-label='delete network' icon={<DeleteIcon/>} onClick={onDelete}/>
      </ButtonGroup>
    </ListItem>
  )
}
