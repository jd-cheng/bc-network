import { ISelected } from '@/lib/sigma'
import React, { 
  useContext,
  useEffect, 
  useRef, 
  useState } from 'react'
import { getSelectedAttributes } from '@/lib/sigma'
import { SelectorContext } from './Selector'
import styles from './Editor.module.css'


function NetworkEditor(){
  const labelRef = useRef<HTMLInputElement | null>(null)
  const colorRef = useRef<HTMLInputElement | null>(null)
  const sizeRef = useRef<HTMLInputElement | null>(null)

  return(
    <>

    </>
  )
}

function NodeEditor(){
  const labelRef = useRef<HTMLInputElement | null>(null)
  const colorRef = useRef<HTMLInputElement | null>(null)
  const sizeRef = useRef<HTMLInputElement | null>(null)
  return(
    <>
    </>
  )
}

function EdgeEditor(){

  return(
    <>
    </>
  )
}


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
  const colorRef = useRef<HTMLInputElement | null>(null)
  const sizeRef = useRef<HTMLInputElement | null>(null)
  const hiddenRef = useRef<HTMLInputElement | null>(null)


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
    setEditor(selected.type)
    
    const defaultAttr = getSelectedAttributes(selected)

    if(labelRef.current && colorRef.current && sizeRef.current && hiddenRef.current){
      labelRef.current.defaultValue = defaultAttr.label
      colorRef.current.defaultValue = defaultAttr.color
      sizeRef.current.defaultValue = defaultAttr.size
      hiddenRef.current.defaultValue = defaultAttr.hidden
    }

  
    return () => {
      console.log('unmount editor')
    }
  }, [selected])
  


  return (
    <div className={styles.wrapper}> 
      <button onClick={()=>setEditor('network')}>network</button>
      <button onClick={()=>setEditor('node')}>node</button>
      <button onClick={()=>setEditor('edge')}>edge</button>
      <p>{editior} Editor</p>

      <p>selected { selected&&selected.type === editior &&selected.key}</p>
      <hr/>
      <p>
      <label>label </label>
      <input type='text' ref={labelRef}/>
      </p>

      <p>
      <label>color </label>
      <input type='text' ref={colorRef}/>

      </p>

      <p>
      <label> size </label>
      <input type='number' ref={sizeRef}/>

      </p>

      <p>
      <label> hidden </label>
      <input type='checkbox' ref={hiddenRef} />
        
      </p>



    </div>
  )
}
