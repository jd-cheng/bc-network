import { renderSetting } from '@/lib/sigma'
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'


export default function Network() {

  const containerRef = useRef<HTMLDivElement>(null)
  const network = useNetworkStore((state) =>state.selected)
  const setSelectedNode = useNodeStore((state) => state.setSelected)

  const clickNode = (evt: SigmaNodeEventPayload ) => {

    console.log("select:",evt)
    if(!network) { return } 
    let nextNode = {key:evt.node}
    setSelectedNode(network,nextNode)

  }

  const clickStage = (evt: SigmaStageEventPayload)=>{
    if(!network) { return }
    setSelectedNode(network, null)
  } 


  useEffect(() => {
    if(!containerRef.current || !network) { return }
    console.log('render network')

    const render = new Sigma(network.graph, containerRef.current)
    render.on("clickNode", clickNode);
    render.on("clickStage",clickStage);
  
    return () => {
      console.log("unmount network")
      render.kill()
    }
  }, [network, containerRef])
  

  return (
    <Box top='0' left='0' w='100%' h='100%' ref={containerRef}></Box>
  )
}
