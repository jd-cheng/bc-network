import { 
  sigma,
  SigmaContext, 
  sigmaState } from '@/lib/sigma'
import React, { 
  useContext, 
  useState } from 'react'
interface IProp{
  selectedNode: string | null
}

export default function NodeController({ selectedNode}:IProp) {


  const [nodeDimension, setNodeDimension] = useState<string>('')
  const [nodeColor, setNodeColor] = useState<string>('')
  const [nodeSize, setNodeSize] = useState<string>('')
  const [nodeLabel, setNodeLabel] = useState<string>('')

  const handleNodeDimension = (evt:React.ChangeEvent<HTMLSelectElement>) =>{
    if (!sigma.render) { return }

    const nodeDimension = evt.target.value
    const network = sigma.render.getGraph()
    const edges = network.filterEdges(selectedNode,(edge)=>{
      return network.hasExtremity(edge,selectedNode)
    })    
    console.log(edges)
    edges.forEach((edge,index)=>{
      if(index <= parseInt(nodeDimension))
      network.setEdgeAttribute(edge, 'color', '#300000')
    })

    sigma.render.refresh()
    setNodeDimension(nodeDimension)
  }

  return (
    <div>
      <p> selected node {selectedNode}</p>
      <p> node dimension {nodeDimension}</p>
      <select value={nodeDimension} onChange={handleNodeDimension}>
        {['1','2','3','4'].map(val =>
          <option key={val} value={val}> {val} </option>
        )}
      </select>
    </div>
  )
}
