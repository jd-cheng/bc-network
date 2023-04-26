import { buildEdges, getMissingEdges, getMissingNodes } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { AddIcon } from '@chakra-ui/icons'
import { Badge, Button, Text, FormLabel, Stack, Wrap, WrapItem, Flex, Tag, TagLabel, TagLeftIcon, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


export default function BCBuilder() {
  
  const [network] = useNetworkStore((state)=>[state.selected])
  const [nodes,node,updateNode] = useNodeStore((state)=>[state.nodes,state.selected,state.updateNode])
  const [missingNodes, setMissingNodes] = useState<string[]>([])
  const [missingEdges, setMissingEdges] = useState<string[]>([])
  // const [redundantNodes]

  const handleClickMissingNode = (label:string)=>{
    if(!network || !node) return
    
    updateNode(network.key, node.key,{label})

  }
  
  useEffect(()=>{
    if(!network) return
    console.log("missing nodes",missingNodes)
    setMissingNodes(getMissingNodes(network.key))
    setMissingEdges(getMissingEdges(network.key))
  },[network,nodes])

  /**
   * missing nodes -> overwrite existing node label : add node with missing label
   * redunent nodes -> remove node
   * missing edges -> add edge
   * redunent edges -> remove edge
   */
  
  return (
    <Stack direction='column' spacing="1">
      <Flex align="center" justify="space-between">
        <Text size="sm" fontWeight="semibold">Nodes</Text>
        <Badge colorScheme={missingNodes.length?"red":"green"} mx="1">
            {missingNodes.length?"missing": "Valid"}
          </Badge>
          <Spacer/>
        <Tag size="sm" variant='subtle'>
            <TagLeftIcon  as={AddIcon} />
            <TagLabel>Add</TagLabel>
          </Tag>
      </Flex>

      <Wrap maxH="20" minH="40px" overflowY="scroll" borderWidth="1px" borderRadius="md" p="1">
        {missingNodes.map((node)=>(
            <WrapItem key={node}>
              <Badge  
                colorScheme='red'
                borderRadius="full"
                _hover={{"cursor":"pointer"}}
                onClick={()=>handleClickMissingNode(node)}
              >
                {node}
              </Badge>
            </WrapItem>
          ))
        }
      </Wrap>

      <Flex align="center" justify="space-between">
        <Text size="sm" fontWeight="semibold">Edges</Text>
        <Badge mx="1" colorScheme={missingEdges.length?"red":"green"}>
            {missingEdges.length?"missing": "Valid"}
          </Badge>
          <Spacer/>
        <Tag size="sm" variant='subtle' _hover={{"cursor":"pointer"}} onClick={()=>!missingNodes.length&&network&&buildEdges(network?.key)}>
            <TagLeftIcon  as={AddIcon} />
            <TagLabel>Add</TagLabel>
          </Tag>
      </Flex>
      <Wrap maxH="20" minH="40px" overflowY="scroll" borderWidth="1px" borderRadius="md" p="1">
        {missingEdges.map((edge)=>(
            <WrapItem key={edge}>
              <Badge  
                colorScheme='red'
                borderRadius="full"
                _hover={{"cursor":"pointer"}}
              >
                {edge}
              </Badge>
            </WrapItem>
          ))
        }
      </Wrap>
    </Stack>
  )
}
