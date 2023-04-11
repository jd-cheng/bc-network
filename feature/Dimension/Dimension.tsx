import { useDimensionStore } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { useToolStore } from '@/store/tools'
import { randomHexColor } from '@/utils/color'


import { Card, CardBody, CardHeader, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DimensionController from './DimensionController'






export default function Dimension() {
  console.log('render dimension')
  const network = useNetworkStore((state)=>state.selected)
  const [dimensions, setDimensions] = useDimensionStore((state)=>[state.dimensions, state.setDimensions])
  const tool = useToolStore((state)=>state.selected)

  useEffect(()=>{
    if(!network) {return}
    const dimension = network.graph.getAttribute('dimension')
    const newDimensions = Array.from({length: dimension}, (value, key)=>{
      return {dimension: key+1, color: randomHexColor(), isRendered: false}
    })
    setDimensions(newDimensions)
  }, [network])
  
  
  return (

      <Stack direction='column' align='center' minWidth='240px' justify='space-between'>
        {dimensions.map((dimension)=>(
          <DimensionController key={dimension.dimension} dimension={dimension} />
        ))}
      </Stack>



  )
}
