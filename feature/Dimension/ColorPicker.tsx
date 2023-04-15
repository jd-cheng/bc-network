import { useDimensionStore } from '@/store/dimensions'
import { PopoverContent, PopoverArrow, PopoverBody, PopoverFooter, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface IProp{
  color: string
  setColor: (color:string)=> void
}

export default function ColorPicker({color, setColor}: IProp) {

  return (
    <PopoverContent w='auto'>
      <PopoverArrow/>
      <PopoverBody >
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverBody>
    </PopoverContent>

  )
}
