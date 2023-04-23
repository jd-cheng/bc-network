import { graphs, useNetworkStore } from '@/store/networks';
import { PointerType, usePointerStore } from '@/store/pointers';
import { Button, ButtonGroup, Card, IconButton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiPointer, BiCircle } from "react-icons/bi"
import { TbHandFinger } from "react-icons/tb";

export default function Pointer() {

  const [pointer, setPointer] = usePointerStore((state)=>[state.pointer, state.setPointer])
  const network = useNetworkStore((state)=>state.selected)

  useEffect(()=>{
    setPointer(network&&PointerType.SELECT)
  },[network?.key])


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
          icon={<TbHandFinger/>}
          aria-label=''
          onClick={()=>setPointer(PointerType.DRAG)}
          isActive={pointer === PointerType.DRAG}
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
