import { graph } from '@/lib/graph'
import { ISelected, renderSetting, sigma } from '@/lib/sigma'
import { selectedState } from '@/store/selected'
import React, { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import Sigma from 'sigma'
import { SigmaNodeEventPayload, SigmaEdgeEventPayload } from 'sigma/sigma'
import styles from './Stage.module.css'



export default function Stage() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const setSelected = useSetRecoilState(selectedState)

  const clickNode = ({node}:SigmaNodeEventPayload)=> {
    // const selected : ISelected = {type:'node',key:node}
    setSelected({type:'node',key:node})

  }

  const clickEdge = ({edge}:SigmaEdgeEventPayload)=> {
    // const selected : ISelected = {type:'edge',key:edge}
    setSelected({type:'edge',key:edge})

  }

  const clickStage = ()=>{
    setSelected({type:null, key:'null'})
  }



  useEffect(() => {
    console.log('render stage')
    if(!stageRef.current) { return }

    sigma.render = new Sigma(graph, stageRef.current, renderSetting)
    sigma.render.on("clickNode", clickNode);
    sigma.render.on("clickEdge", clickEdge)
    sigma.render.on("clickStage",clickStage);
  
    return () => {
      console.log("unmount stage")
      sigma.render && sigma.render.kill()
    }
  }, [stageRef])
  

  return (
    <div className={styles.stage} ref={stageRef}></div>
  )
}
