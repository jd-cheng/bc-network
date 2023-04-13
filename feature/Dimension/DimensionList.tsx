import { useDimensionStore } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { randomHexColor } from '@/utils/color'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import DimensionViewer from './DimensionViewer'


export default function DimensionList() {
  console.log('render dimension list')
  const network = useNetworkStore((state)=>state.selected)
  const [dimensions, setDimensions] = useDimensionStore((state)=>[state.dimensions, state.setDimensions])

  useEffect(()=>{
    if(!network) {return}

    const dimension = network.graph.getAttribute('dimension')
    const newDimensions = Array.from({length: dimension}, (value, index)=>{
      return {key: index+1, color: randomHexColor(), isRender: false}
    })

    setDimensions(newDimensions)

  }, [network])
  
  
  return (
    <Stack 
      direction='column' 
      align='center' 
      minWidth='240px' 
      justify='space-between' 
      position='absolute' 
      top='56px' 
      zIndex='overlay' 
      borderWidth='1px' 
      borderRadius='md' 
      py='8px'
      hidden={!network}
    >
      {dimensions.map((dimension)=>(
        <DimensionViewer key={dimension.key} dimension={dimension} />
      ))}
    </Stack>
  )
}
