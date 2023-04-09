import { renderSetting } from '@/lib/sigma'
import { INetwork, useNetworkStore } from '@/store/networks'
import { ISelected,  useSelectedStore } from '@/store/selected'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaEdgeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import styles from './Stage.module.css'


export default function Network() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  // const setSelected = useSetRecoilState(selectedState)
  const [network] = useNetworkStore((state) =>[state.openedNetwork])
  const [selected, setSelected] = useSelectedStore((state) => [state.selected, state.setSelected])

  const select = (element: SigmaNodeEventPayload | SigmaEdgeEventPayload | SigmaStageEventPayload) => {

    console.log("select:",element)
    if(!network) { return } 
    let nextSelected = null as ISelected | null
    
    if('node' in element){
      nextSelected = {type:'node',key: element.node, attributes: network.graph.getNodeAttributes(element.node)}
    }

    if('edge' in element){
      nextSelected = {type:'edge',key: element.edge, attributes: network.graph.getEdgeAttributes(element.edge)}
    }

    setSelected(network,nextSelected)

  }


  useEffect(() => {
    if(!containerRef.current || !network) { return }
    console.log('render network')

    const render = new Sigma(network.graph, containerRef.current, renderSetting)
    render.on("clickNode", select);
    render.on("clickEdge", select)
    render.on("clickStage",select);
  
    return () => {
      console.log("unmount network")
      render.kill()
    }
  }, [network, containerRef])
  

  return (
    <Box top='0' left='0' w='100%' h='100%' ref={containerRef}></Box>
  )
}
