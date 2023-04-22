import { PointerType, usePointerStore } from '@/store/pointers';
import { ButtonGroup, Card, IconButton } from '@chakra-ui/react'
import React from 'react'
import { BiPointer, BiCircle } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs";
import { TfiHandDrag } from "react-icons/tfi";



export default function Pointer() {

  const [pointer, setPointer] = usePointerStore((state)=>[state.pointer, state.setPointer])

  return (
    <Card position='fixed' bottom="16px" left="50%" transform="translateX(-50%)" >
      <ButtonGroup isAttached>
        <IconButton
          icon={<BiPointer/>}
          aria-label=''
          onClick={()=>setPointer(PointerType.SELECT)}
          isActive={pointer === PointerType.SELECT}
        />
        <IconButton
          icon={<TfiHandDrag/>}
          aria-label=''
        />

        <IconButton
          icon={<BiCircle/>}
          aria-label=''
          onClick={()=>setPointer(PointerType.ADDNODE)}
          isActive = {pointer === PointerType.ADDNODE}          
        />
      </ButtonGroup>
    </Card>
  )
}
