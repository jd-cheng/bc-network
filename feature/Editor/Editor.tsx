import React, { HTMLProps, useEffect, useState } from 'react'
import * as RadixLabel from '@radix-ui/react-label';
import { useSelectedStore } from '@/store/selected';
import styles from './Editor.module.css'
import * as Form from '@radix-ui/react-form';
import { graph } from '@/lib/graph';
import { Resolver, useForm } from 'react-hook-form';
import { renderEdge, renderNetwork, renderNode } from '@/lib/sigma';


type NetworkFormValues = {
  key: string;
  type: string;
  label: string;
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
};

const resolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};



export default function Editor() {

  const selected = useSelectedStore((state) => state.selected)
  const { register, handleSubmit } = useForm<NetworkFormValues>({ resolver });


  const setSelectedAttributes = (evt: React.FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    console.log(evt)
    // graph.updateNodeAttribute(selected?.key, 'label',oldVal=>evt.currentTarget.label.value)

  }

  const resetAttribute = (evt: React.FocusEvent<HTMLInputElement>)=>{
    console.log('input onBlur')
    console.log(evt)

  }

  const onSubmit = (data:any) =>{
    switch(selected?.key){
      case 'network':
        renderNetwork(data)
        break;
      case 'node':
        renderNode(data)
        break;
      case 'edge':
        renderEdge(data)
        break
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <button></button>
    </div>
  )
}


const Label = ({children, htmlFor}:{children?: React.ReactNode; htmlFor?: string})=>{
  return (
    <RadixLabel.Root className="text-[15px] font-medium leading-[35px] text-white" htmlFor={htmlFor}>
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