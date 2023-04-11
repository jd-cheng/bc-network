import { renderDimension } from '@/lib/sigma'
import { IDimension } from '@/store/dimensions'
import { useNetworkStore } from '@/store/networks'
import { useSelectedStore } from '@/store/selected'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { ButtonGroup, Button, IconButton,  Text, Stack, Box, Popover, PopoverTrigger, PopoverAnchor } from '@chakra-ui/react'
import React, { useState } from 'react'
import ColorPicker from './ColorPicker'

interface IProp {
  dimension: IDimension
  // onToggle: ()=>void
}


export default function DimensionController({dimension}: IProp) {
  console.log('render dimension item')
  const [color, setColor] = useState(dimension.color)
  const network = useNetworkStore((state)=>state.openedNetwork)
  const selected = useSelectedStore((state)=>state.selected)

  const handleColor = (newColor:string) =>{
    console.log('handle color')
    if(!network) {return}
    // const{ graph } = network
    // graph.forEachEdge((edge)=>{
    //   graph.hasExtremity(edge, selected?.key) && graph.updateEdgeAttribute(edge,'color',oldVal=>newColor)
      
    // })
    renderDimension(network, {...dimension, color:newColor}, selected?.key)
    setColor(newColor)
  }


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
          <Text as="b">{dimension.dimension}-dimension</Text>

          <ButtonGroup isAttached>

            <IconButton aria-label='' icon={<ViewIcon/>}/>
            <IconButton aria-label='' icon={<ChevronDownIcon/>}/>

          </ButtonGroup>
        </Stack>
      </PopoverAnchor>

      <ColorPicker color={color} setColor={handleColor}/>
    </Popover>

  )
}
