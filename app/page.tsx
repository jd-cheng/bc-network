"use client"

import { 
  useEffect, 
  useRef, 
  useState} from 'react'
import { 
  ControllerType,
  handleEdge, 
  handleNode, 
  sigma, 
  sigmaSetting, } from '@/lib/sigma'
import { 
  SigmaEdgeEventPayload, 
  SigmaNodeEventPayload } from 'sigma/sigma'
import Sigma from 'sigma'
import styles from './page.module.css'
import Controller from '@/components/Controller'
import { network } from '@/lib/network'


export default function Home() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [controller, setController] = useState<ControllerType>('network')
  const [target, setTarget] = useState<string | null>(null)

  const clickNode = ({node}:SigmaNodeEventPayload)=> {

    handleNode(node)
    setController('node')
    setTarget(node)

  }

  const clickEdge = ({edge}:SigmaEdgeEventPayload)=> {

    handleEdge(edge)
    setController('edge')
    setTarget(edge)

  }

  const clickStage = ()=>{
    sigma.state.selectedNode && handleNode(null)
    sigma.state.selectedEdge && handleEdge(null)
    setTarget(null)

  }

  useEffect(()=>{
    console.log("render sigma")
    if(!containerRef.current){ return }

    sigma.render = new Sigma(network, containerRef.current,sigmaSetting) 
    sigma.render.on("clickNode", clickNode);
    sigma.render.on("clickEdge", clickEdge)
    sigma.render.on("clickStage",clickStage);

    return ()=>{
      console.log("unmount sigma")
      sigma.render && sigma.render.kill()
    }
  }
  ,[containerRef])
  

  return (
    <main className={styles.main}>
      <div className={styles.controller}>
        <button onClick={()=>setController('network')}>network</button>
        <button onClick={()=>setController('node')}>node</button>
        <button onClick={()=>setController('edge')}>edge</button>
        <Controller type={controller} target={target}/>
      </div>
      <div className={styles.container} ref={containerRef}></div>
    </main>
  )
}
