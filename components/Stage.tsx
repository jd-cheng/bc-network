import { graph, renderSetting, sigma } from '@/lib/sigma'
import React, { useEffect, useRef } from 'react'
import Sigma from 'sigma'
import styles from './Stage.module.css'



export default function Stage() {
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('render stage')
    if(!stageRef.current) { return }

    sigma.render = new Sigma(graph, stageRef.current, renderSetting)
  
    return () => {
      console.log("unmount stage")
      sigma.render && sigma.render.kill()
    }
  }, [stageRef])
  

  return (
    <div className={styles.stage} ref={stageRef}></div>
  )
}
