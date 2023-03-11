"use client"

import { 
  useEffect, 
  useRef } from 'react'
import Sigma from 'sigma'
import Controller from '@/components/Controller'
import { createHypercube } from '@/lib/BCnetwork'
import styles from './page.module.css'
import { 
  handleEdge, 
  handleNode, 
  sigma, 
  sigmaSetting } from '@/lib/sigma'


export default function Home() {

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    console.log("render sigma")

    if(containerRef.current){
      sigma.render = new Sigma(createHypercube(), containerRef.current,sigmaSetting) 

      sigma.render.on("clickNode", ({node})=>{
        handleNode(node);
      });
  
      sigma.render.on("clickEdge",({edge})=>{
        handleEdge(edge)
      })
  
      sigma.render.on("clickStage", ()=>{
        if(sigma.state.selectedEdge) handleEdge(null)
        if(sigma.state.selectedNode) handleNode(null)
      });
    }

    return ()=>{
      console.log("unmount sigma")
      sigma.render && sigma.render.kill()
    }
  }
  ,[containerRef])
  

  return (
    <main className={styles.main}>
      <div className={styles.controller}>
        <Controller/>
      </div>
      <div className={styles.container} ref={containerRef}></div>
    </main>
  )
}
