import { NetworkAttributes } from '@/lib/graph'
import { validateNodes } from '@/lib/network'
import { 
  NetworkType, 
  networkTypes, 
  useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Badge, Card, CardBody, CardHeader, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useWatch, UseWatchProps } from 'react-hook-form'



export default function Builder({control}: UseWatchProps<NetworkAttributes>) {
  
  const [network,updateNetwork] = useNetworkStore((state)=>[state.selected, state.updateNetwork])
  const [nodes] = useNodeStore((state)=>[state.nodes])
  const dimension = useWatch({control, name:"dimension"})
  const type = useWatch({control, name:"type"})
  const [missingNodes, setMissingNodes] = useState<string[]>([])

  
  useEffect(()=>{

    if(!network || !dimension) return
    console.log(dimension)
    setMissingNodes(validateNodes(network))
  },[dimension])

  
  return (
    <Card>
      <CardHeader>
        Missing Nodes
      </CardHeader>
      <CardBody>
        <Wrap>
          {missingNodes.map((node)=>(
            <WrapItem key={node}>
              <Badge  colorScheme='red'>{node}</Badge>
            </WrapItem>
          ))}
        </Wrap>
      </CardBody>
    </Card>

  )
}
