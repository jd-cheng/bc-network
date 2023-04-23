import { getISTs, getISTWithEdges, getISTWithEdgesByIndex } from '@/lib/hypercube'
import { graphs, useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { randomHexColor } from '@/utils/color'
import { 
  ArrowBackIcon,
  ArrowForwardIcon,
  ViewIcon, 
  ViewOffIcon } from '@chakra-ui/icons'
import { 
  IconButton,  
  Text, 
  Stack, 
  Box, 
  Popover, 
  PopoverTrigger, 
  PopoverAnchor, 
  Button,
  ButtonGroup,
  Collapse,
  useDisclosure} from '@chakra-ui/react'
import Graph from 'graphology'
import React, { useEffect, useState } from 'react'
import { TbTool } from "react-icons/tb";


interface IProp {
  index: number
}


export default function ISTBuilder({index}:IProp) {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [isBuilding, setIsBuilding] = useState(false)
  const [color, setColor] = useState(randomHexColor)
  const [edges, setEdges] = useState<string[]>([])
  const [pointer, setPointer] = useState<number>(-1)
  const { isOpen, onToggle } = useDisclosure()

  const handleColor = (nextColor:string) =>{
    console.log('handle color')
    if(!network || !isBuilding) {return}
    
    setColor(nextColor)
  }

  const handleIsBuilding = ()=>{
    console.log('handle isRendered')
    if(!network) {return}

    onToggle()
  }

  const handleForward = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(edges[pointer+1],"color",color)

    setPointer(pointer+1)
  }

  const hanldeBack = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(edges[pointer],"color","")

    setPointer(pointer-1)
  }

  useEffect(()=>{
    if(!network || !node) { return }
    console.log('render IST builder', node)

    // console.log(getISTs(graphs.get(network.key),node.key))
    setEdges(getISTWithEdges(graphs.get(network.key)as Graph, node.key,index))
    setPointer(-1)

    return ()=>{
      console.log('unmount IST builder')
    }

  }, [node])


  return (
    <Popover
      placement='right'
      isLazy
    >
      <PopoverAnchor>
        <Stack direction='row' align='center' justify='space-between' w='full'>
          <PopoverTrigger>
            <Box as="button" bg={color} w="24px" h="24px"  />
          </PopoverTrigger>
          <Text >{index+1}th-IST</Text>
          <IconButton 
            aria-label='' 
            icon={<TbTool/>} 
            onClick={handleIsBuilding} 
            isActive={isOpen} 
            isDisabled={!node}
          />
        </Stack>
      </PopoverAnchor>
      <Collapse in={isOpen} animateOpacity>
            <ButtonGroup isAttached>
              <IconButton
                  aria-label=""
                  icon={<ArrowBackIcon/>}
                  onClick={hanldeBack}
                />
                <IconButton
                  aria-label=""
                  icon={<ArrowForwardIcon/>}
                  onClick={handleForward}
                />
            </ButtonGroup>
          </Collapse>
    </Popover>

  )
}
