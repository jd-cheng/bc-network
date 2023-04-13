import DimensionList from '@/feature/Dimension/DimensionList'
import NetworkBuilder from '@/feature/NetworkBuilder'
import { useNetworkStore } from '@/store/networks'
import { ToolType, useToolStore } from '@/store/tools'
import { Box } from '@chakra-ui/react'
import React from 'react'

export default function ToolPanel() {

  const tool = useToolStore((state)=>state.selected)
  const network = useNetworkStore((state)=>state.selected)

  return network? (
    <Box position='absolute' top='56px' zIndex='overlay' borderWidth='1px' borderRadius='md' hidden={!tool || tool === ToolType.IST}>
      {tool === ToolType.BC && <NetworkBuilder/>}
      {tool === ToolType.DIMENSION && <DimensionList/>}      
    </Box>
    ):(
    <></>
  )
}
