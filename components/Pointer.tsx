import { getISTs } from '@/lib/hypercube';
import { renderIST } from '@/lib/sigma';
import { graphs, useNetworkStore } from '@/store/networks';
import { useNodeStore } from '@/store/nodes';
import { PointerType, usePointerStore } from '@/store/pointers';
import { Button, ButtonGroup, Card, IconButton } from '@chakra-ui/react'
import Graph from 'graphology';
import React from 'react'
import { BiPointer, BiCircle } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs";
import { TfiHandDrag } from "react-icons/tfi";



export default function Pointer() {

  const [pointer, setPointer] = usePointerStore((state)=>[state.pointer, state.setPointer])
  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const handleIST = ()=>{
    if(!network || !node) return
    renderIST(network.key,node.key,0)
  }

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
        <Button onClick={handleIST}>IST</Button>
      </ButtonGroup>
    </Card>
  )
}
