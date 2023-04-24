import { getISTByIndex, getNodeLabel } from '@/lib/network'
import { renderIST } from '@/lib/sigma'
import { IEdge } from '@/store/edges'
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


interface IProp {
  index: number
}


export default function ISTBuilder({index}:IProp) {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [color, setColor] = useState(randomHexColor)
  const [tree, setTree] = useState<IEdge[]>([])
  const [pointer, setPointer] = useState<number>(-1)
  const { isOpen, onToggle } = useDisclosure()

  const handleColor = (nextColor:string) =>{
    console.log('handle color')
    if(!network) {return}
    
    setColor(nextColor)
  }

  const handleForward = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(tree[pointer+1],"color",color)

    setPointer(pointer+1)
  }

  const hanldeBack = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(tree[pointer],"color","")

    setPointer(pointer-1)
  }

  useEffect(()=>{
    if(!network || !node) { return }

    const tree = getISTByIndex(network.key,node.key,index).map((edge)=>{
      const graph = graphs.get(network.key) as Graph
      return{key:edge, source:graph.source(edge), target:graph.target(edge)}
    })

    setTree(tree)
    setPointer(-1)

    return ()=>{
      console.log('unmount IST builder')
      tree.length && renderIST(network.key,node.key,index)
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
            <Box as="button" bg={color} w="32px" h="32px"  />
          </PopoverTrigger>
          <Text >{index+1}th-IST</Text>
          <IconButton 
            aria-label='' 
            icon={isOpen?<ViewIcon/>:<ViewOffIcon/>} 
            onClick={onToggle} 
            isDisabled={!node}
            variant="outline"
          />
        </Stack>
      </PopoverAnchor>
      <Collapse in={isOpen} animateOpacity>
            <ButtonGroup isAttached variant='outline'>
              <IconButton
                  aria-label=""
                  icon={<ArrowBackIcon/>}
                  isDisabled={pointer<0}
                  onClick={hanldeBack}
                />
                <Button>
                  {network && node && tree.length && pointer&& 
                    getNodeLabel(network?.key,tree[pointer].source).join(" - ").join(getNodeLabel(network?.key,tree[pointer].target))
                  }
                </Button>
                <IconButton
                  aria-label=""
                  icon={<ArrowForwardIcon/>}
                  onClick={handleForward}
                  isDisabled={pointer>=tree.length-1}
                />
            </ButtonGroup>
          </Collapse>
    </Popover>

  )
}
