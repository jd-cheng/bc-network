import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import { ButtonGroup, Button, IconButton, Flex, Text, Stack, Box, PopoverArrow, PopoverBody, PopoverContent } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface IProp {
  dimension: number
  defaultColor?: string
}

export default function DimensionItem({dimension, defaultColor}: IProp) {
  const [color, setColor] = useState("#b32aa9")



  return (
    <>
      <Stack direction='row' align='center'>
        <Box as="button" bg={color} w="32px" h="32px" />
        <Text as="b">1-dimension</Text>

        <ButtonGroup isAttached>

          <IconButton aria-label='' icon={<ViewIcon/>}/>
          <IconButton aria-label='' icon={<ChevronDownIcon/>}/>

        </ButtonGroup>
      </Stack>
      <PopoverContent>
        <PopoverArrow/>
        <PopoverBody>
          <HexColorPicker color={color} onChange={setColor}/>
        </PopoverBody>
      </PopoverContent>
    </>

  )
}
