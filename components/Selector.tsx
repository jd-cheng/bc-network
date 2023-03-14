import { 
  setSelected as handleSelected , 
  ISelected, 
  sigma, } from '@/lib/sigma'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { SigmaEdgeEventPayload, SigmaNodeEventPayload } from 'sigma/sigma'
import styles from './Selector.module.css'


interface IProp {
  children: React.ReactNode
}

export const SelectorContext = createContext<ISelected | null>(null)

export default function Selector({children}:IProp) {

  const [selected, setSelected] = useState<ISelected | null>(null)

  const clickNode = ({node}:SigmaNodeEventPayload)=> {

    const selected : ISelected = {type:'node',key:node}
    handleSelected(selected)
    setSelected(selected)

  }

  const clickEdge = ({edge}:SigmaEdgeEventPayload)=> {

    const selected : ISelected = {type:'edge',key:edge}
    handleSelected(selected)
    setSelected(selected)

  }

  const clickStage = ()=>{

    handleSelected(null)
    setSelected(null)

  }

  useEffect(()=>{
    console.log("render selector")

    if(sigma.render){
      sigma.render.on("clickNode", clickNode);
      sigma.render.on("clickEdge", clickEdge)
      sigma.render.on("clickStage",clickStage);
    }

    return ()=>{
      console.log("unmount selector")
    }
  }
  ,[])
  

  return (
    <SelectorContext.Provider value={selected}>
      {children}
    </SelectorContext.Provider>
  )
}
