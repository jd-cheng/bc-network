import { graph } from '@/lib/graph'
import { renderSetting, sigma } from '@/lib/sigma'
import { selectedState } from '@/store/selected'
import React, { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import Sigma from 'sigma'
import { 
  SigmaNodeEventPayload, 
  SigmaEdgeEventPayload, 
  SigmaStageEventPayload } from 'sigma/sigma'
import styles from './Stage.module.css'



export default function Stage() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const setSelected = useSetRecoilState(selectedState)

  const select = (element: SigmaNodeEventPayload | SigmaEdgeEventPayload | SigmaStageEventPayload) => {

    //click node
    if('node' in element){
      setSelected({type:'node',key: element.node})
      return
    }

    //click edge
    if('edge' in element){
      setSelected({type:'edge', key:element.edge})
      return
    }

    //click stage
    setSelected(null)

  }


  useEffect(() => {
    console.log('render stage')
    if(!stageRef.current) { return }

    sigma.render = new Sigma(graph, stageRef.current, renderSetting)
    sigma.render.on("clickNode", select);
    sigma.render.on("clickEdge", select)
    sigma.render.on("clickStage",select);
    // graph.import(data)
  
    return () => {
      console.log("unmount stage")
      sigma.render && sigma.render.kill()
      graph.clear()
    }
  }, [stageRef])
  

  return (
    <div className={styles.stage} ref={stageRef}></div>
  )
}
