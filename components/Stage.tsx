import { graph } from '@/lib/graph'
import { renderSetting, sigma } from '@/lib/sigma'
import { ISelected,  useSelectedStore } from '@/store/selected'

import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaEdgeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import styles from './Stage.module.css'



export default function Stage() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  // const setSelected = useSetRecoilState(selectedState)

  const [selected, setSelected] = useSelectedStore(
    (state) => [state.selected, state.setSelected]
  )


  const select = (element: SigmaNodeEventPayload | SigmaEdgeEventPayload | SigmaStageEventPayload) => {

    console.log("select:",element)
    let newSelected = null as ISelected | null
    
    if('node' in element){
      newSelected = {type:'node',key: element.node, attributes: graph.getNodeAttributes(element.node)}
    }

    if('edge' in element){
      newSelected = {type:'edge',key: element.edge, attributes: graph.getEdgeAttributes(element.edge)}
    }

    setSelected(newSelected)

  }


  useEffect(() => {
    console.log('render stage')
    if(!stageRef.current) { return }

    sigma.render = new Sigma(graph, stageRef.current, renderSetting)
    sigma.render.on("clickNode", select);
    sigma.render.on("clickEdge", select)
    sigma.render.on("clickStage",select);
  
    return () => {
      console.log("unmount stage")
      sigma.render && sigma.render.kill()
    }
  }, [stageRef])
  

  return (
    <div className={styles.stage} ref={stageRef}></div>
  )
}
