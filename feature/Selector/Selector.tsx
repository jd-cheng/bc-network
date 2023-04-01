import { edgesState } from '@/store/edges'
import { networksState } from '@/store/networks'
import { nodesState } from '@/store/nodes'
import { ISelected, selectedState } from '@/store/selected'
import React, { HTMLProps, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styles from './Selector.module.css'
import List from '@/components/List';
import ListItem from '@/components/ListItem';




export default function Selector() {

  const networkList = useRecoilValue(networksState)
  const nodeList = useRecoilValue(nodesState)
  const edgeList = useRecoilValue(edgesState)
  const [selected, setSelelted]= useRecoilState(selectedState)
  const [selector, setSelector] = useState<'network'| 'node' | 'edge' | null >(selected? selected.type : null)

  return (
    <div>
      <button onClick={()=>setSelector('network')}>neworks</button>
      <button onClick={()=>setSelector('node')}>nodes</button>
      <button onClick={()=>setSelector('edge')}>edges</button>
      <List>
        {selector === 'network' && networkList.map((network)=>
          <ListItem key={network.key} onClick={()=>{
            setSelelted({type:'network', key:network.key})
          }}>
            {network.key}
          </ListItem>
        )}
        {selector === 'node' && nodeList.map((node)=>
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
        )}
      </List>
    </div>

  )
}


