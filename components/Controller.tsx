import { 
  sigma,  
  ControllerType } from '@/lib/sigma'
import React, { 
  useEffect, 
  useState } from 'react'
import { getTargetAttributes} from '@/lib/network'
interface IProp {
  type: ControllerType
  target: string | null
}

export default function Controller({type, target}:IProp ) {

  // label: string | null;
  // size: number;
  // color: string;
  // hidden: boolean;
  // forceLabel: boolean;
  // zIndex: number;
  // type: string;

  const { render } = sigma

  const [dimension, setDimension] = useState<number>(4)
  const [label, setLabel] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [hidden, setHidden] = useState()
  // const [draggable, setDraggable] = useState(defAttr.draggable)
  
  useEffect(() => {
    console.log('render controller')

    if(!target) return
    const defaultAttr = getTargetAttributes(type, target)
    setLabel(defaultAttr.label)
    setColor(defaultAttr.color)
    setSize(defaultAttr.size)
    setHidden(defaultAttr.hidden)
  
    return () => {
      console.log('unmount controller')
    }
  }, [type, target])
  


  return (
    <div> 
      <p>{type} Controller</p>
      <p>selected {target}</p>
      <hr/>
      <p>Dimension</p>
      <p>dimension {dimension}</p>
      <hr/>
      <p>Display</p>
      {label && <p>label {label}</p>}
      <p>color {color}</p>
      <p>size {size}</p>
      <p>hidden {hidden}</p>
      {/* <p>draggable checkbox</p> */}


    </div>
  )
}
