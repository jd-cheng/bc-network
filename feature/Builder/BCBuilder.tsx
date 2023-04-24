import { getMissingNodes } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Badge, Button, Text, FormLabel, Stack, Wrap, WrapItem, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


export default function BCBuilder() {
  
  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected, state.updateNetwork])
  const [nodes] = useNodeStore((state)=>[state.nodes])
  const [missingNodes, setMissingNodes] = useState<string[]>([])
  const [missingEdges, setMissingEdges] = useState<string[]>([])
  // const [redundantNodes]

  
  useEffect(()=>{
    if(!network) return
    console.log("missing nodes",missingNodes)
    setMissingNodes(getMissingNodes(network.key))
  },[network,nodes])

  /**
   * missing nodes -> overwrite existing node label : add node with missing label
   * redunent nodes -> remove node
   * missing edges -> add edge
   * redunent edges -> remove edge
   */
  
  return (
    <Stack direction='column' spacing="1">
      <Flex direction='row' justify="space-between" align="center">
        <Text fontWeight="semibold">
          Nodes
          <Badge ml='1' colorScheme={missingNodes.length?"red":"green"}>
            {missingNodes.length?"Invalid": "Valid"}
          </Badge>
        </Text>
        <Button size="sm" variant="outline">
          Auto Fix
        </Button>
      </Flex>
      <Wrap>
        {missingNodes.map((node)=>(
          <WrapItem key={node}>
            <Button  
              colorScheme='red'
              size="sm"
            >
              {node}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <FormLabel size='sm'>
        Edges
        <Badge ml='1' colorScheme={missingNodes.length?"gray":missingEdges.length?"red":"green"}>
          {missingNodes.length?"Disabled":missingEdges.length?"Invalid":"Valid"}
        </Badge>
      </FormLabel>
    </Stack>
  )
}
