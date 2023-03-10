import React from 'react'
import Sigma from 'sigma'

interface IProp {
  sigma: Sigma | null;
  selectedEdge: string | null;
  setSeletedEdge: (edge:string)=>void;
}

export default function EdgeController({sigma, selectedEdge,setSeletedEdge}:IProp) {
  return (
    <div>EdgeController</div>
  )
}
