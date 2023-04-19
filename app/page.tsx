"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import NetworkList from '@/feature/Network/NetworkList'
import Viewer from '@/feature/Viewer/Viewer'


export default function Home() {
  return (
    <>
      <header>
        <NetworkMenu/>
        <NetworkList/>
        <Viewer/>

      </header>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
    </>

  )
}
