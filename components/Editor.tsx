import { ISelected } from '@/lib/sigma'
import React, { 
  useContext,
  useEffect, 
  useRef, 
  useState } from 'react'
import { getSelectedAttributes } from '@/lib/sigma'
import { SelectorContext } from './Selector'


export default function Editor() {

  // label: string | null;
  // size: number;
  // color: string;
  // hidden: boolean;
  // forceLabel: boolean;
  // zIndex: number;
  // type: string;
  const selected = useContext(SelectorContext)
  const [editior, setEditor] = useState<'network'| 'node' | 'edge'>('network')
  const labelRef = useRef<HTMLInputElement | null>(null)
  // const [label, setLabel] = useState()
  // const [color, setColor] = useState()
  // const [size, setSize] = useState()
  // const [hidden, setHidden] = useState()
  // const [draggable, setDraggable] = useState(defAttr.draggable)

  const handleLabel = ()=>{
    
  }

  const handleColor = ()=>{

  }

  const handleSize = ()=>{

  }

  const handleHidden = ()=>{

  }


  
  
  useEffect(() => {
    console.log('render editor')
    if(!selected) { return }
    const defaultAttr = getSelectedAttributes(selected)

    if(labelRef.current){
      labelRef.current.defaultValue = defaultAttr.label
    }


    // setLabel(defaultAttr.label)
    // setColor(defaultAttr.color)
    // setSize(defaultAttr.size)
    // setHidden(defaultAttr.hidden)
  
    return () => {
      console.log('unmount editor')
    }
  }, [selected])
  


  return (
    <div> 
      <button onClick={()=>setEditor('network')}>network</button>
      <button onClick={()=>setEditor('node')}>node</button>
      <button onClick={()=>setEditor('edge')}>edge</button>
      <p>{editior} Editor</p>
      <p>selected {(selected&&editior === selected.type) && selected.key}</p>
      <hr/>
      {/* <p>Dimension</p>
      <label>current dimension </label>
      <select value={dimension} onSelect={}>
        {['1','2','3','4'].map(val=>(
          <option value={val}>{val}</option>
        ))}
      </select>
      <hr/> */}
      

      <label>label </label>
      <input type='text' ref={labelRef}/>

      {/* <label>color </label>
      <input type='text'/>

      <label> size </label>
      <input type='number'/>

      <label> hidden </label>
      <input type='checkbox' /> */}
      {/* <p>draggable checkbox</p> */}


    </div>
  )
}
