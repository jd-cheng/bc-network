import React, { HTMLProps, useEffect, useState } from 'react'
import { useNodeStore } from '@/store/nodes';
import styles from './Editor.module.css'
import { Resolver, useForm } from 'react-hook-form';
import NodeForm, { NodeFormValues } from '../../refactor/NodeForm';
import { useNetworkStore } from '@/store/networks';


const resolver: Resolver<NodeFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};



export default function Editor() {

  const selected = useNodeStore((state) => state.selected)
  const network = useNetworkStore((state)=> state.selected)
  const { register, handleSubmit } = useForm<NodeFormValues>({ resolver });

  
  return (
    <div className={styles.wrapper}>
      <h1>{selected? '' : network?.key}</h1>
    </div>
  )
}
