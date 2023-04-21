import { Button, Card,  Divider, Flex, Heading, Stack,  } from '@chakra-ui/react'
import React from 'react'
import AddNetwork from './AddNetwork'
import NetworkList from './NetworkList'

export default function MenuPanel() {


  return (
    <>
      <Card>
        <Stack direction='column' my="8px">
          <Flex justify='space-between' align='center' px="16px">
            <Heading size='sm'>Networks</Heading>
            <AddNetwork/>
          </Flex>

          <Divider/>
          <NetworkList/>
        </Stack>
      </Card>
    </>
  )
}


