import { 
  PopoverContent, 
  PopoverArrow, 
  PopoverBody } from '@chakra-ui/react'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

interface IProp{
  color: string
  setColor: (color:string)=> void
}

export default function ColorPicker({color, setColor}: IProp) {

  return (
    <HexColorPicker color={color} onChange={setColor} />
  )
}
