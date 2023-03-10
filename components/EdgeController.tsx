import { SigmaContext } from '@/lib/sigma';
import React, { useContext } from 'react'
interface IProp {

  selectedEdge: string | null;
  setSeletedEdge: (edge:string)=>void;
}

export default function EdgeController({selectedEdge, setSeletedEdge}:IProp) {

  const sigma = useContext(SigmaContext)

  return (
    <div>EdgeController</div>
  )
}
