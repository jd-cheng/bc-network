import { getISTByIndex } from '@/lib/network'
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
  useDisclosure,
  PopoverArrow,
  PopoverBody,
  PopoverContent} from '@chakra-ui/react'
import Graph from 'graphology'
import React, { useEffect, useState } from 'react'
import ColorPicker from './ColorPicker'


interface IProp {
  index: number
}


export default function ISTBuilder({index}:IProp) {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [color, setColor] = useState(randomHexColor)
  const [tree, setTree] = useState<IEdge[]>([])
  const [pointer, setPointer] = useState<number>(-1)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [isRendered, setIsRenderd] = useState<boolean>(false)

  const handleColor = (nextColor:string) =>{
    console.log('handle color')
    if(!network) {return}
    const graph = graphs.get(network.key) as Graph
    for(const edge of tree.slice(0,pointer+1)){
      graph.setEdgeAttribute(edge.key,"color",nextColor)
    }
    setColor(nextColor)
  }

  const handleForward = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(tree[pointer+1].key,"color",color)

    setPointer(pointer+1)
  }

  const hanldeBack = ()=>{
    if(!network || !node) return
    const graph = graphs.get(network.key) as Graph
    console.log(pointer)
    graph.setEdgeAttribute(tree[pointer].key,"color","")

    setPointer(pointer-1)
  }

  const handleIsRendered = ()=>{
    if(!network || !node) return
    renderIST(network.key, node.key, index, !isRendered?color:undefined)
    setPointer(!isRendered?tree.length-1: -1)
    setIsRenderd(!isRendered)

  }

  useEffect(()=>{
    if(!network || !node) { return }

    const tree = getISTByIndex(network.key,node.key,index).map((edge)=>{
      const graph = graphs.get(network.key) as Graph
      return{key:edge, source:graph.source(edge), target:graph.target(edge)}
    })

    setTree(tree)
    setPointer(-1)
    setIsRenderd(false)

    return ()=>{
      console.log('unmount IST builder')
      tree.length && renderIST(network.key,node.key,index)
    }

  }, [node?.key])


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
      <Collapse in={isOpen} animateOpacity >
            <ButtonGroup isAttached variant='outline' w="224px">
              <IconButton
                  aria-label=""
                  icon={<ArrowBackIcon/>}
                  isDisabled={pointer<0}
                  onClick={hanldeBack}
                />
                <Button onClick={handleIsRendered} flexGrow="1">
                  {!isRendered?"Render":"Clear"}
                  {/* {network && node && tree.length && pointer&& 
                    getNodeLabel(network?.key,tree[pointer].source).join(" - ").join(getNodeLabel(network?.key,tree[pointer].target))
                  } */}
                </Button>
                <IconButton
                  aria-label=""
                  icon={<ArrowForwardIcon/>}
                  onClick={handleForward}
                  isDisabled={pointer>=tree.length-1}
                />
            </ButtonGroup>
          </Collapse>
          <PopoverContent w='auto'>
            <PopoverArrow/>
            <PopoverBody >
              <ColorPicker color={color} setColor={handleColor}/>
            </PopoverBody>
          </PopoverContent>
    </Popover>
  )
}
