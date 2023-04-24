"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import ToolMenu from '@/components/ToolMenu'
import Cursor from '@/components/Cursor'


export default function Home() {
  return (
    <>
      <NetworkMenu/>
      <ToolMenu/>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
      <Cursor/>
    </>

  )
}
