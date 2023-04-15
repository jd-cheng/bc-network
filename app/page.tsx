"use client"

import Network from '@/components/Network'
import { Box } from '@chakra-ui/react'
import ToolMenu from '@/components/Tools/ToolMenu'
import NetworkMenu from '@/feature/Network/NetworkMenu'
import NetworkList from '@/feature/Network/NetworkList'


export default function Home() {



  return (
    <>
      <header>
        <NetworkMenu/>
        <NetworkList/>
        <ToolMenu/>

      </header>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
        {/* <Toolbar/> */}
      </Box>

    </>

  )
}
