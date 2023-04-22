import { graphs, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DimensionViewer from './DimensionViewer'

export default function DimensionList() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [dimensions, setDimensions] = useState<number[]>([])

  useEffect(()=>{
    if(!network) { return }
    console.log('render dimension viewers')

    const dimension = graphs.get(network.key)?.getAttribute('dimension')
    const newDimensions = Array.from({length: dimension}, (value, index)=>{
      return index+1
    })
  
    setDimensions(newDimensions)

  }, [network])

  return (
    <Stack 
      direction='column' 
      align='center' 
      justify='space-between' 
    >
      {dimensions.map((dimension)=>(
        <DimensionViewer key={dimension} dimension={dimension} />
      ))}
    </Stack>
  )
}
