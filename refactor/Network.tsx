import { renderSetting } from '@/lib/sigma'
import { graphs, INetwork } from '@/store/networks'
import { useOpenedStore } from '@/store/opened'
import { ISelected,  useSelectedStore } from '@/store/selected'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaEdgeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import styles from './Stage.module.css'

interface IProp{
  network: INetwork | null
}

export default function Network() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  // const setSelected = useSetRecoilState(selectedState)
  const [network] = useOpenedStore(
    (state) =>[state.openedNetwork]
  )

  const graph = network? graphs.get(network.graph): null

  const [selected, setSelected] = useSelectedStore(
    (state) => [state.selected, state.setSelected]
  )

  const select = (element: SigmaNodeEventPayload | SigmaEdgeEventPayload | SigmaStageEventPayload) => {

    console.log("select:",element)
    if(!graph) { return } 
    let newSelected = null as ISelected | null
    
    if('node' in element){
      newSelected = {type:'node',key: element.node, attributes: graph.getNodeAttributes(element.node)}
    }

    if('edge' in element){
      newSelected = {type:'edge',key: element.edge, attributes: graph.getEdgeAttributes(element.edge)}
    }

    network && setSelected(network.key,newSelected)

  }




  useEffect(() => {
    console.log('render stage')
    if(!containerRef.current || !graph) { return }

    const render = new Sigma(graph, containerRef.current, renderSetting)
    render.on("clickNode", select);
    render.on("clickEdge", select)
    render.on("clickStage",select);
  
    return () => {
      console.log("unmount stage")
      render.kill()
    }
  }, [network,containerRef])
  

  return (
    <div className={styles.container} ref={containerRef}></div>
  )
}
