import List from '@/components/List'
import ListItem from '@/components/ListItem'
import { useNetworkStore } from '@/store/networks'
import styles from './Sidebar.module.css'
import React, { useState } from 'react'
import Graph from 'graphology'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid';

import Editor from '@/feature/Editor/Editor'
import { NetworkFormValues } from '../NetworkForm'
import AddNetwork from './AddNetwork'
import NetworkList from './NetworkList'
import NetworkItem from './NetworkItem'




export default function Sidebar() {
  const [networks, addNetwork, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.addNetwork, state.deleteNetwork, state.openNetwork])

  return (
    <div className='w-[180px] flex-col h-full'>
      <p className=''>
        BC Network        
      </p>
      <NetworkList>
        {networks.map((network)=>(
          <NetworkItem key={network.key} onClick={()=>{
            console.log('click', network)
            openNetwork(network)
          }}>
            {network.name}
          </ NetworkItem>
        ))}
      </NetworkList>
      <AddNetwork/>
  </div>
  )
}
