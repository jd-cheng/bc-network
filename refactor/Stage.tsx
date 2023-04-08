import { renderSetting } from '@/lib/sigma'
import { INetwork, useNetworkStore } from '@/store/networks'
import { ISelected,  useSelectedStore } from '@/store/selected'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaEdgeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'


export default function Stage() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  // const setSelected = useSetRecoilState(selectedState)
  const [network] = useNetworkStore(
    (state) =>[state.openedNetwork]
  )


  const [selected, setSelected] = useSelectedStore(
    (state) => [state.selected, state.setSelected]
  )

  const select = (element: SigmaNodeEventPayload | SigmaEdgeEventPayload | SigmaStageEventPayload) => {

    console.log("select:",element)
    if(!network) { return } 
    let newSelected = null as ISelected | null
    
    if('node' in element){
      newSelected = {type:'node',key: element.node, attributes: network.graph.getNodeAttributes(element.node)}
    }

    if('edge' in element){
      newSelected = {type:'edge',key: element.edge, attributes: network.graph.getEdgeAttributes(element.edge)}
    }

    setSelected(network,newSelected)

  }


  useEffect(() => {
    console.log('render stage')
    if(!containerRef.current || !network) { return }

    const render = new Sigma(network.graph, containerRef.current, renderSetting)
    render.on("clickNode", select);
    render.on("clickEdge", select)
    render.on("clickStage",select);
  
    return () => {
      console.log("unmount stage")
      render.kill()
    }
  }, [network, containerRef])
  

  return (
    <div className="flex-1 overflow-hidden w-full h-full" ref={containerRef}></div>
  )
}
