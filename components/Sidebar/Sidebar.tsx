import { useNetworkStore } from '@/store/networks'
import React from 'react'
import AddNetwork from './AddNetwork'
import NetworkItem from './NetworkItem'
import { Divider, Heading, List } from '@chakra-ui/react'




export default function Sidebar() {
  const [networks, addNetwork, deleteNetwork, openNetwork] = useNetworkStore((state)=> [state.networks, state.addNetwork, state.deleteNetwork, state.openNetwork])

  return (
    <div className='flex flex-col h-full w-[180px] '>
      <Heading p={1}>BC Network</Heading>
      <Divider/>      
      <List flex='1 1 auto'>
        {networks.map((network)=>(
          <NetworkItem key={network.key} onClick={()=>{
            console.log('click', network)
            openNetwork(network)
          }}>
            {network.name}
          </ NetworkItem>
        ))}
      </List>
      <Divider/>
      <AddNetwork/>
  </div>
  )
}
