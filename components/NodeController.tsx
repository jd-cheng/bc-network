import { sigma } from '@/lib/sigma'
import React, { useState } from 'react'
interface IProp{
  selectedNode: string | null
}

export default function NodeController({ selectedNode}:IProp) {

  const { render } = sigma
  const [nodeDimension, setNodeDimension] = useState<string>('')
  const [nodeColor, setNodeColor] = useState<string>('')
  const [nodeSize, setNodeSize] = useState<string>('')
  const [nodeLabel, setNodeLabel] = useState<string>('')

  const handleNodeDimension = (evt:React.ChangeEvent<HTMLSelectElement>) =>{
    if (!render) { return }


  }

  const handleNodeDisplayAttribute = (type:string, value:string) =>{
    if (!render) { return }

    render.getGraph().updateNodeAttribute(selectedNode, type, pre => value)

  } 




  return (
    <div>
      <p> selected node {selectedNode}</p>
      <hr></hr>
      <p> node dimension {nodeDimension}</p>
      <select value={nodeDimension} onChange={handleNodeDimension}>
        {['1','2','3','4'].map(val =>
          <option key={val} value={val}> {val} </option>
        )}
      </select>
      <hr></hr>
      {/* <p>node color {nodeColor}</p>
      <select value={nodeColor} onChange={handleNodeDimension}>
        {['1','2','3','4'].map(val =>
          <option key={val} value={val}> {val} </option>
        )}
      </select>
      <hr></hr> */}
      <p>node size {nodeSize}</p>
      <label>size</label>
      <input type='text' onChange={(evt)=>{handleNodeDisplayAttribute('size',evt.target.value)}}/>
      <hr></hr>
      <p>node label {nodeLabel}</p>
      <input type='text' onChange={(evt)=>{handleNodeDisplayAttribute('label',evt.target.value)}}/>
    </div>
  )
}
