"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import Pointer from '@/components/Pointer'
import NetworkEditor from '@/feature/Editor/NetworkEditor'
import NodeEditor from '@/feature/Editor/NodeEditor'


export default function Home() {
  return (
    <>
      <header>
        <NetworkMenu/>
        <NetworkEditor/>
        <NodeEditor/>
      </header>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
      <Pointer/>
    </>

  )
}
