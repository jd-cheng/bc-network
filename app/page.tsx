"use client"

import Network from '@/components/Network'
import {Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import ToolMenu from '@/components/ToolMenu'
import Cursor from '@/components/Cursor'
import SelectAlert from '@/components/SelectAlert'



export default function Home() {
  return (
    <>
      <NetworkMenu/>
      <ToolMenu/>
      <SelectAlert/>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
      <Cursor/>

    </>

  )
}
