import { CursorType, useCursorStore } from '@/store/cursors';
import { useNetworkStore } from '@/store/networks';
import { ArrowForwardIcon as EdgeIcon, DeleteIcon } from '@chakra-ui/icons';
import { ButtonGroup, Card, IconButton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiPointer as SelectIcon, BiCircle as NodeIcon } from "react-icons/bi"
import { TbHandFinger as DragIcon } from "react-icons/tb";


const cursors = [
  {type:CursorType.SELECT, icon:<SelectIcon/>},
  {type:CursorType.DRAG, icon:<DragIcon/>},
  {type:CursorType.ADDNODE, icon:<NodeIcon/>},
  {type:CursorType.ADDEDGE, icon:<EdgeIcon/>},
  {type:CursorType.DELETE,icon:<DeleteIcon/>}
]

export default function Pointer() {

  const [selected, setCursor] = useCursorStore((state)=>[state.cursor, state.setCursor])
  const network = useNetworkStore((state)=>state.selected)
  useEffect(()=>{
    setCursor(network&&CursorType.SELECT)
  },[network?.key])


  return network?(  
    <Card position='fixed' bottom="16px" left="50%" transform="translateX(-50%)" >
      <ButtonGroup isAttached>
        {cursors.map((cursor)=>
          <IconButton
            key={cursor.type}
            icon={cursor.icon}
            aria-label=""
            onClick={()=>setCursor(cursor.type)}
            isActive={selected === cursor.type}
          />
        )}
      </ButtonGroup>
    </Card>
  ):(
    <></>
  )  
}
