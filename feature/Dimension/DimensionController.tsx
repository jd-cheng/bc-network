import { IDimension } from '@/store/dimensions'
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { ButtonGroup, Button, IconButton,  Text, Stack, Box, Popover, PopoverTrigger, PopoverAnchor } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import ColorPicker from './ColorPicker'

interface IProp {
  dimension: IDimension
  // onToggle: ()=>void
}


export default function DimensionController({dimension}: IProp) {
  console.log('render dimension item')
  const [color, setColor] = useState(dimension.color)


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

      <ColorPicker color={color} setColor={setColor}/>
    </Popover>

  )
}
