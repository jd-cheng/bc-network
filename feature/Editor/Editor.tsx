import React, { HTMLProps, useEffect, useState } from 'react'
import * as RadixLabel from '@radix-ui/react-label';
import { useSelectedStore } from '@/store/selected';
import styles from './Editor.module.css'
import * as Form from '@radix-ui/react-form';
import { Resolver, useForm } from 'react-hook-form';
import { useOpenedStore } from '@/store/opened';
import NodeForm, { NodeFormValues } from '../../components/NodeForm';


const resolver: Resolver<NodeFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};



export default function Editor() {

  const selected = useSelectedStore((state) => state.selected)
  const openedNetwork = useOpenedStore((state)=> state.openedNetwork)
  const { register, handleSubmit } = useForm<NodeFormValues>({ resolver });
  console.log('render editor')

  
  return (
    <div className={styles.wrapper}>
      <h1>{selected? '' : openedNetwork?.name}</h1>
      {selected?.type === 'node' && <NodeForm register={register} defaultValues={selected.attributes}/>}
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