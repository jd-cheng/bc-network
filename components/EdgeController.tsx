import { sigma} from '@/lib/sigma';
import React from 'react'
interface IProp {
  selectedEdge: string | null;
}

export default function EdgeController({selectedEdge}:IProp) {

  const { render } = sigma


  return (
    <div>
      <p> selected edge {selectedEdge}</p>
    </div>
  )
}
