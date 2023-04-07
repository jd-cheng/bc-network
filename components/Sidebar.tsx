import List from '@/components/List'
import ListItem from '@/components/ListItem'
import { useNetworkStore } from '@/store/networks'
import styles from './Sidebar.module.css'
import React, { useState } from 'react'
import Graph from 'graphology'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid';
import NetworkForm, { NetworkFormValues } from './NetworkForm'
import Editor from '@/feature/Editor/Editor'

const networkResolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};


export default function Sidebar() {
  const { register: networkReg, handleSubmit: handleNetworkSubmit } = useForm<NetworkFormValues>({ resolver: networkResolver });
  const [networks, addNetwork, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.addNetwork, state.deleteNetwork, state.openNetwork])
  const [mode, setMode] = useState<'add' | 'select' | 'edit'>('select')

  const onNetworkSubmit: SubmitHandler<NetworkFormValues> = (data)=>{
    console.log('submit network')
    const { graph: graphFile, name, type, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const fileReader = new FileReader()
    const graph = new Graph()
    const key = uuidv1()

    const readFile = ()=>{
      console.log('read file')
      // const  result  = fileReader.result as string
      // const data = JSON.parse(result)
      // graph.import(data)
      // addGraph(key, graph)
    }
    fileReader.onloadend = readFile
    // fileReader.readAsText(graphFile)
    // addNetwork({key, type, name})

  }


  return (
    <div className={styles.wrapper}>
      <h1> BC Network</h1>
      <button onClick={()=> setMode('select')}> select</button><br/>
      <button onClick={()=>setMode('add')}> add </button><br/>
      <button onClick={()=>setMode('edit')}> edit </button><br/>
      { mode === 'select' && (
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
      )
    }
    { mode === 'add' && (
        <>
          <NetworkForm register={networkReg}/>
          <button onClick={handleNetworkSubmit(onNetworkSubmit)}>submit</button>
        </>  
      )
    }
    { mode === 'edit' && (
        <Editor/>
      )
    }
  </div>
  )
}
