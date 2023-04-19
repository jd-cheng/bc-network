import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface IProp {
  name: string
  value: string | number
}

export default function AttributesViewer({name, value}: IProp) {
  return (
    <Stack direction='row' alignItems='center'>
      <Heading size='sm'>
        {name+":"}
      </Heading>
      <Text>{value}</Text>
    </Stack>
  )
}
