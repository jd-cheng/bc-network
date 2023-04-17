import { useNetworkStore } from '@/store/networks'
import { ToolType, useToolStore } from '@/store/tools'
import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DimensionViewer from './DimensionViewer'


export default function DimensionList() {
  const network = useNetworkStore((state)=>state.selected)
  const tool = useToolStore((state)=>state.selected) 
  const [dimensions, setDimensions] = useState<number[]>([])

  useEffect(()=>{
    if(!network) {return}
    console.log('render dimension list')
    const dimension = network.graph.getAttribute('dimension')
    const newDimensions = Array.from({length: dimension}, (value, index)=>{
      return index+1
    })

    setDimensions(newDimensions)

    return ()=>{
      console.log('unmount dimension viewer')
    }

  }, [network])
  
  
  return (
    <Stack 
      direction='column' 
      align='center' 
      minWidth='240px' 
      justify='space-between' 
      hidden={tool !== ToolType.DIMENSION || !network}
    >
      {dimensions.map((dimension)=>(
        <DimensionViewer key={dimension} dimension={dimension} />
      ))}
    </Stack>
  )
}
