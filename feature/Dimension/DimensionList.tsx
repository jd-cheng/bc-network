import { renderDimension } from '@/lib/sigma'
import { useDimensionStore } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { ToolType, useToolStore } from '@/store/tools'
import { randomHexColor } from '@/utils/color'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import DimensionViewer from './DimensionViewer'


export default function DimensionList() {
  const network = useNetworkStore((state)=>state.selected)
  const [tool, setTool] = useToolStore((state)=>[state.selected, state.setSelected]) 
  const [dimensions, setDimensions] = useDimensionStore((state)=>[state.dimensions, state.setDimensions])


  useEffect(()=>{
    if(!network) {return}
    console.log('render dimension list')
    const dimension = network.graph.getAttribute('dimension')
    const newDimensions = Array.from({length: dimension}, (value, index)=>{
      return {key: index+1, color: randomHexColor(), isRender: false}
    })

    setDimensions(newDimensions)

    return ()=>{
      console.log('unmount dimension viewer')
    }

  }, [network, tool])
  
  
  return (
    <Stack 
      direction='column' 
      align='center' 
      minWidth='240px' 
      justify='space-between' 
      hidden={tool !== ToolType.DIMENSION || !network}
    >
      {dimensions.map((dimension)=>(
        <DimensionViewer key={dimension.key} dimension={dimension} />
      ))}
    </Stack>
  )
}
