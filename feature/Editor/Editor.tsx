import React, { HTMLProps, useEffect, useState } from 'react'
import { useSelectedStore } from '@/store/selected';
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

  const selected = useSelectedStore((state) => state.selected)
  const openedNetwork = useNetworkStore((state)=> state.openedNetwork)
  const { register, handleSubmit } = useForm<NodeFormValues>({ resolver });
  console.log('render editor')

  
  return (
    <div className={styles.wrapper}>
      <h1>{selected? '' : openedNetwork?.key}</h1>
    </div>
  )
}
