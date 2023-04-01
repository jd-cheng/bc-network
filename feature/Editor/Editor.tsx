import React, { 
  HTMLProps,
  useEffect, 
  useRef, 
  useState } from 'react'
import styles from './Editor.module.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedState } from '@/store/selected'
import { getSelectedAttributes } from '@/lib/graph'
import * as RadixLabel from '@radix-ui/react-label';
import { selectFamilyState } from '@/store/selectedFamily'



export default function Editor() {

  const selected = useRecoilValue(selectedState)
  const selectedAttributes = selected && getSelectedAttributes(selected)

  const seletedAttributesFamily = useRecoilState(selectFamilyState(JSON.stringify(selected)))

  const setAttributes = (evt: React.FormEvent)=>{
    evt.preventDefault()
    console.log(evt.currentTarget)
    console.log(selectFamilyState)


  }

  const resetAttribute = (evt: React.FocusEvent<HTMLInputElement>)=>{
    console.log('input onBlur')
    console.log(evt)

  }



  


  return (
    <div className={styles.wrapper}> 
      <p>{selected?.type}</p>
      <p>{selected?.key}</p>
      <hr/>
      <form onSubmit={setAttributes}>
        <Label>Label </Label>
        <Input 
          type='text'
          defaultValue={selectedAttributes?.label}
          onBlur={resetAttribute}
        />
        <hr/>
        <Label>Color</Label>
        <Input 
          type='text' 
          defaultValue={selectedAttributes?.color}
          onBlur={resetAttribute}
        />
        <button type='submit'></button>
      </form>

    </div>
  )
}


const Label = ({children}:{children?: React.ReactNode})=>{
  return (
    <RadixLabel.Root className="text-[15px] font-medium leading-[35px] text-white">
      {children}
    </RadixLabel.Root>
  )
}

const Input = ({...prop}: HTMLProps<HTMLInputElement>)=>{
  return (
    <input 
      className="bg-blackA5 shadow-blackA9 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
      {...prop}
    />
  )
}

const NetworkForm = ()=>{

}

// const NodeAttributes = ()=>{
//   return(
//     <>
//       <Label>Label </Label>
//       <Input 
//         type='text'
//         defaultValue={selectedAttributes?.label}
//         // onKeyDown={setLabel} 
//         onBlur={resetLabel}
//       />
//       <hr/>
//       <Label>Color</Label>
//       <Input 
//         type='text' 
//         defaultValue={selectedAttributes?.color}
//         // onKeyDown={handleColor} 
//         // onBlur={handleColor}
//       />
//       <Label>Size</Label>
//       <Input
//         type='text'
//         defaultValue={}
//       />
//     </>

//   )
// }