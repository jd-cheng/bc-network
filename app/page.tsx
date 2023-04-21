"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import Toolbar from '@/components/Toolbar'
import NetworkEditor from '@/feature/Builder/NetworkEditor'


export default function Home() {
  return (
    <>
      <header>
        <NetworkMenu/>
        <NetworkEditor/>
      </header>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
    </>

  )
}
