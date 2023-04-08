import { Button, ListItem, Text } from '@chakra-ui/react'
import React, { HTMLProps } from 'react'

interface IProp extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}

export default function NetworkItem({children, ...prop}:IProp) {
  return (
    <ListItem >
      <Button variant='ghost' w={'100%'}>
        {children}
      </Button>
    </ListItem>
  )
}
