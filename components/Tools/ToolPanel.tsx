import Dimension from '@/feature/Dimension/Dimension'
import NetworkBuilder from '@/feature/NetworkBuilder'
import { ToolType, useToolStore } from '@/store/tools'
import { Box } from '@chakra-ui/react'
import React from 'react'

export default function ToolPanel() {

  const [tool] = useToolStore((state)=>[state.selected])

  return (
    <Box position='absolute' top='56px' zIndex='popover' borderWidth='1px' borderRadius='md' py='8px' hidden={!tool || tool === ToolType.IST}>
      {tool === ToolType.BC && <NetworkBuilder/>}
      {tool === ToolType.DIMENSION && <Dimension/>}      
    </Box>
  )
}
