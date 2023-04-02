
import { ISelected, useSelectedStore} from '@/store/selected'
import React, { HTMLProps, useState } from 'react'
import styles from './Selector.module.css'
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import { useGraphStore } from '@/store/graph';




export default function Selector() {


  const setSelelted= useSelectedStore((state) => state.setSelected)
  const [networks, nodes, edges] = useGraphStore((state)=>[state.networks, state.nodes, state.edges])
  const [selector, setSelector] = useState<'network'| 'node' | 'edge' | null >('network')

  return (
    <div>
      <button onClick={()=>setSelector('network')}>neworks</button>
      <button onClick={()=>setSelector('node')}>nodes</button>
      <button onClick={()=>setSelector('edge')}>edges</button>
      <List>
        {/* {selector === 'network' && networkList.map((network)=>
          <ListItem key={network.key} onClick={()=>{
            setSelelted({type:'network', key:network.key})
          }}>
            {network.key}
          </ListItem>
        )} */}
        {/* {selector === 'node' && nodeList.map((node)=>
          <ListItem key={node.key}onClick={()=>{
            setSelelted({type:'node', key:node.key})
          }}>
            {node.key}
          </ListItem>
        )}
        {selector === 'edge' && edgeList.map((edge)=>
          <ListItem key={edge.key}onClick={()=>{
            setSelelted({type:'edge', key:edge.key})
          }}>
            {edge.key}
          </ListItem>
        )} */}
      </List>
    </div>

  )
}


