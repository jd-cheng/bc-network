import { NetworkAttributes } from '@/lib/graph'
import { validateNodes } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Badge, Card, CardBody, CardHeader, FormLabel, Heading, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useWatch, UseWatchProps } from 'react-hook-form'



export default function BCBuilder() {
  
  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected, state.updateNetwork])
  const [nodes] = useNodeStore((state)=>[state.nodes])
  const [missingNodes, setMissingNodes] = useState<string[]>([])
  const [missingEdges, setMissingEdges] = useState<string[]>([])

  
  useEffect(()=>{
    if(!network) return
    console.log("missing nodes",missingNodes)
    setMissingNodes(validateNodes(network.key))
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
        <Badge ml='1' colorScheme={missingNodes.length?"red":"green"}>
          {missingNodes.length?"Invalid": "Valid"}
        </Badge>
      </FormLabel>
      <Wrap>
        {missingNodes.map((node)=>(
          <WrapItem key={node}>
            <Badge  colorScheme='red'>{node}</Badge>
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
