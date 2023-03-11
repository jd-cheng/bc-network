import { sigma, SigmaContext } from '@/lib/sigma';
import React, { useContext } from 'react'
interface IProp {

  selectedEdge: string | null;

}

export default function EdgeController({selectedEdge}:IProp) {

  return (
    <div>EdgeController</div>
  )
}
