import List from '@/components/List'
import ListItem from '@/components/ListItem'
import { useNetworkStore } from '@/store/networks'
import { useOpenedStore } from '@/store/opened'
import styles from './Sidebar.module.css'
import React, { useState } from 'react'
import Graph from 'graphology'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid';
import { addGraph } from '@/store/graphs'
import NetworkForm, { NetworkFormValues } from './NetworkForm'

const networkResolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};


export default function Sidebar() {
  const { register: networkReg, handleSubmit: handleNetworkSubmit } = useForm<NetworkFormValues>({ resolver: networkResolver });
  const [networks, addNetwork, deleteNetwork] = useNetworkStore((state)=> [state.networks, state.addNetwork, state.deleteNetwork])
  const openNetwork = useOpenedStore((state) => state.openNetwork)
  const [mode, setMode] = useState<'add' | 'select'>('select')

  const onNetworkSubmit: SubmitHandler<NetworkFormValues> = (data)=>{
    console.log(data)
    const { graph: graphFile, name, type, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const fileReader = new FileReader()
    const graph = new Graph()

    const readFile = ()=>{
      const  result  = fileReader.result as string
      const data = JSON.parse(result)
      graph.import(data)
    }

    fileReader.onloadend = readFile

    const key = uuidv1()

    addNetwork({key, type, name})
    addGraph(key, graph)

  }


  return (
    <div className={styles.wrapper}>
      <h1> Bijective Connection Network</h1>
      <button onClick={()=> mode === 'select'? setMode('add'): setMode('select')}> add network</button>
      { mode === 'select' ? (
        <List>
          {networks.map((network)=>(
            <ListItem key={network.key} onClick={()=>{
              console.log('click', network)
              openNetwork(network)
            }}>
              {network.name}
            </ListItem>
          ))}
        </List>
      ): (
        <>
          <NetworkForm register={networkReg}/>
          <button onClick={handleNetworkSubmit(onNetworkSubmit)}>submit</button>
        </>  
      )
    }
  </div>
  )
}
