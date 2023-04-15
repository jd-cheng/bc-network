import { renderDimension } from '@/lib/sigma'
import { 
  IDimension, 
  useDimensionStore } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { ToolType, useToolStore } from '@/store/tools'
import { 
  ViewIcon, 
  ViewOffIcon } from '@chakra-ui/icons'
import { 
  IconButton,  
  Text, 
  Stack, 
  Box, 
  Popover, 
  PopoverTrigger, 
  PopoverAnchor } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ColorPicker from './ColorPicker'

interface IProp {
  dimension: IDimension
}


export default function DimensionViewer({dimension}: IProp) {
  console.log('render dimension viewer', dimension)

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const tool = useToolStore((state)=>state.selected)

  const { key, color, isRender } = dimension
  const [setIsRender,setColor] = useDimensionStore((state)=>[state.setIsRender, state.setColor])

  const handleColor = (nextColor:string) =>{
    console.log('handle color')
    if(!network || !isRender) {return}
    
    renderDimension(network, dimension, nextColor, node?.key)
    setColor(dimension, nextColor)
  }

  const handleIsRender = ()=>{
    console.log('handle isRender')
    if(!network) {return}

    const nextIsRender = !isRender
    renderDimension(network, dimension, nextIsRender?color : null, node?.key)
    setIsRender(dimension, nextIsRender)
  }

  useEffect(()=>{
    if(!network) { return }
    console.log('render dimension viewer')

    renderDimension(network, dimension, null)
    tool === ToolType.DIMENSION && isRender && renderDimension(network, dimension, color, node?.key)

    return ()=>{
      console.log('unmount dimension viewer')
      renderDimension(network, dimension, null)
    }

  }, [node, tool])


  return (
    <Popover
      placement='right'
      isLazy
    >
      <PopoverAnchor>
        <Stack direction='row' align='center'>
          <PopoverTrigger>
            <Box as="button" bg={color} w="32px" h="32px"  />
          </PopoverTrigger>
          <Text>{key}-dimension</Text>
          <IconButton aria-label='' icon={isRender?<ViewIcon/>: <ViewOffIcon/>} onClick={handleIsRender}/>
        </Stack>
      </PopoverAnchor>

      <ColorPicker color={color} setColor={handleColor}/>
    </Popover>

  )
}
