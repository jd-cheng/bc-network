import Sigma from "sigma";
import { useEffect, useRef, useState } from 'react'
import { graph } from "@/libs/BCnetwork";
import styles from './Display.module.css'




export default function Display() {

  const containerRef = useRef<HTMLDivElement | null>(null)

  let sigma: Sigma | null = null

  useEffect(()=>{
    if(containerRef.current)
    sigma = new Sigma(graph, containerRef.current)

    return ()=>{
      if(sigma){
        sigma.kill()
      }
    }
  }
  ,[])

  return (
    <div className={styles.container} ref={containerRef}>

    </div>
  )
}