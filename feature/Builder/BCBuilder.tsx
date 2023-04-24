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
      <FormLabel size="sm">
        Nodes
        <Badge ml="2" colorScheme={missingNodes.length?"red":"green"}>
          {missingNodes.length?"missing": "Valid"}
        </Badge>
      </FormLabel>
      <Wrap maxH="20" minH="40px" overflowY="scroll" borderWidth="1px" borderRadius="md" p="1">
        {missingNodes.map((node)=>(
            <WrapItem key={node}>
              <Badge  
                colorScheme='red'
                borderRadius="full"
                _hover={{"cursor":"pointer"}}
              >
                {node}
              </Badge>
            </WrapItem>
          ))
        }
      </Wrap>

      <FormLabel size='sm'>
        Edges
        <Badge ml="2" colorScheme={missingNodes.length?"red":"green"}>
                {missingNodes.length?"missing": "Valid"}
        </Badge>
      </FormLabel>
      
        <Wrap maxH="20" minH="40px" overflowY="scroll" borderWidth="1px" borderRadius="md" p="1">
          {missingNodes.map((node)=>(
              <WrapItem key={node}>
                <Badge  
                  colorScheme='red'
                  borderRadius="full"
                  _hover={{"cursor":"pointer"}}
                >
                  {node}
                </Badge>
              </WrapItem>
            ))
          }
        </Wrap>
    </Stack>
  )
}
