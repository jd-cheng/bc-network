"use client"


import Header from '@/components/Header/Header'
import Network from '@/components/Network'

import Sidebar from '@/components/Sidebar/Sidebar'
import Toolbar from '@/components/Toolbar/Toolbar'
import Dimension from '@/feature/Dimension/Dimension'
import Editor from '@/feature/Editor/Editor'

import { Box } from '@chakra-ui/react'


export default function Home() {



  return (
    <>
      {/* <Header/>
      <Box as="main" position='relative' flex='1 1 auto'>
        <Network/>
        <Toolbar/>
      </Box>
      <Sidebar/> */}
      <Box display='flex' flex='0 0 auto'>

      <Dimension/>
      <Box flex='1 0 auto'>
        testsetsetseeststes
      </Box>
      </Box>
    </>

  )
}
