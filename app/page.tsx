"use client"

import { 
  createContext,
  useEffect, 
  useRef, 
  useState } from 'react'
import Sigma from 'sigma'
import Controller from '@/components/Controller'
import { createHypercube } from '@/lib/BCnetwork'
import styles from './page.module.css'
import { SigmaContext } from '@/lib/sigma'


export default function Home() {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [sigma, setSigma] = useState<Sigma | null>(null)

  useEffect(()=>{
    console.log("render sigma")
    let sigmaIns: Sigma | null = null

    if(containerRef.current){
      sigmaIns = new Sigma(createHypercube(), containerRef.current) 
    }
    setSigma(sigmaIns)
    return ()=>{
      console.log("unmount sigma")
      if(sigmaIns){
        sigmaIns.kill()
      }
      setSigma(null)
    }
  }
  ,[containerRef])
  

  return (
    <SigmaContext.Provider value={sigma}>
      <main className={styles.main}>
        <div className={styles.controller}>
          <Controller/>
        </div>
        <div className={styles.container} ref={containerRef}></div>
      </main>
    </SigmaContext.Provider>

  )
}
