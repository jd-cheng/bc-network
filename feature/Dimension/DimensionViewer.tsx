import { renderDimension } from '@/lib/sigma'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { randomHexColor } from '@/utils/color'
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
import React, { useEffect, useState } from 'react'
import ColorPicker from './ColorPicker'


interface IProp {
  dimension: number
}


export default function DimensionViewer({dimension}:IProp) {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [isRendered, setIsRendered] = useState(false)
  const [color, setColor] = useState(randomHexColor)

  const handleColor = (nextColor:string) =>{
    console.log('handle color')
    if(!network || !isRendered) {return}
    
    renderDimension(network.key, dimension, nextColor, node?.key)
    setColor(nextColor)
  }

  const handleIsRendered = ()=>{
    console.log('handle isRendered')
    if(!network) {return}

    const nextIsRender = !isRendered
    renderDimension(network.key, dimension, nextIsRender?color : null, node?.key)
    setIsRendered(nextIsRender)
  }

  useEffect(()=>{
    setIsRendered(false)
    setColor(randomHexColor())

    return ()=>{
      network && renderDimension(network.key, dimension, null)
    }
    
  }, [network])

  useEffect(()=>{
    if(!network) { return }
    console.log('render dimension viewer', node)

    isRendered && renderDimension(network.key, dimension, color, node?.key)

    return ()=>{
      console.log('unmount dimension viewer')
      renderDimension(network.key, dimension, null)
    }

  }, [node])


  return (
    <Popover
      placement='right'
      isLazy
    >
      <PopoverAnchor>
        <Stack direction='row' align='center' >
          <PopoverTrigger>
            <Box as="button" bg={color} w="24px" h="24px"  />
          </PopoverTrigger>
          <Text>{dimension}-dimension</Text>
          <IconButton aria-label='' icon={isRendered?<ViewIcon/>: <ViewOffIcon/>} onClick={handleIsRendered}/>
        </Stack>
      </PopoverAnchor>

      <ColorPicker color={color} setColor={handleColor}/>
    </Popover>

  )
}
