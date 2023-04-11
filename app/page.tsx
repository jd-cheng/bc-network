"use client"


import Network from '@/components/Network'

import NetworkMenu from '@/components/NetworkMenu'

import { Box } from '@chakra-ui/react'
import NetworkList from '@/components/NetworkList'
import Toolbar from '@/components/Tools/Toolbar'
import ToolMenu from '@/components/Tools/ToolMenu'


export default function Home() {



  return (
    <>
      <NetworkMenu/>
      <NetworkList/>
      <ToolMenu/>
      <Box as="main" position='relative' flex='1 1 auto'>
        {/* <Network/> */}
        {/* <Toolbar/> */}
        {/* <Dimension/> */}
      </Box>

    </>

  )
}
