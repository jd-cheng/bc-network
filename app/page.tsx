"use client"

import { 
  useEffect, 
  useRef, 
  useState} from 'react'
import { 
  handleEdge, 
  handleNode, 
  sigma, 
  sigmaSetting } from '@/lib/sigma'
import { 
  SigmaEdgeEventPayload, 
  SigmaNodeEventPayload } from 'sigma/sigma'
import Sigma from 'sigma'
import { createHypercube } from '@/lib/BCnetwork'
import styles from './page.module.css'
import EdgeController from '@/components/EdgeController'
import NetworkController from '@/components/NetworkController'
import NodeController from '@/components/NodeController'

interface Selected {
  type: string;
  value: string | null;
}

export default function Home() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<Selected>({type:'network',value:null})
  const [controller, setController] = useState<string>('network')

  const clickNode = ({node}:SigmaNodeEventPayload)=> {
    handleNode(node)

    setSelected({type:'node',value:node})
    setController('node')

  }

  const clickEdge = ({edge}:SigmaEdgeEventPayload)=> {
    handleEdge(edge)

    setSelected({type:'edge',value:edge})
    setController('edge')

  }

  const clickStage = ()=>{
    sigma.state.selectedNode && handleNode(null)
    sigma.state.selectedEdge && handleEdge(null)
    setSelected({type:'network',value:null})

  }

  useEffect(()=>{
    console.log("render sigma")
    if(!containerRef.current){ return }

    sigma.render = new Sigma(createHypercube(), containerRef.current,sigmaSetting) 
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
        {controller === 'network'  && <NetworkController/>}
        {controller === 'node' && <NodeController selectedNode={selected.type === 'node'?selected.value:null}/>}
        {controller === 'edge' && <EdgeController selectedEdge={selected.type === 'edge'?selected.value:null}/>}

      </div>
      <div className={styles.container} ref={containerRef}></div>
    </main>
  )
}
