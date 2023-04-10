import { useDimensionStore } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { useSelectedStore } from '@/store/selected'

import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import DimensionController from './DimensionController'






export default function Dimension() {
  console.log('render dimension')
  // const selected = useSelectedStore((state)=>state.selected)
  // const network = useNetworkStore((state)=>state.openedNetwork)
  const dimensions = useDimensionStore((state)=>state.dimensions)
  
  
  return (
    <Card size='md' direction='column' align="center">
      <CardHeader borderBottomWidth='1px'>
        <Heading>Dimension</Heading>
      </CardHeader>
            <CardBody>

              {dimensions.map((dimension)=>(
                <DimensionController key={dimension.dimension} dimension={dimension} />
              ))}
              {/* {Array(network?.dimension).map((value, index)=>(
                <div></div>
                ))
              } */} 

            </CardBody>

    </Card>
  )
}
