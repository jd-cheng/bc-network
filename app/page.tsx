"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import Pointer from '@/components/Pointer'
import NetworkEditor from '@/feature/Editor/NetworkEditor'
import NodeEditor from '@/feature/Editor/NodeEditor'
import ToolMenu from '@/components/ToolMenu'


export default function Home() {
  return (
    <>
      <NetworkMenu/>
      <ToolMenu/>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
      </Box>
      <Pointer/>
    </>

  )
}
