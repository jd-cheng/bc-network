import { edgesState } from '@/store/edges'
import { networksState } from '@/store/networks'
import { nodesState } from '@/store/nodes'
import { selectedState } from '@/store/selected'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styles from './Selector.module.css'




export default function Selector() {

  const networkList = useRecoilValue(networksState)
  const nodeList = useRecoilValue(nodesState)
  const edgeList = useRecoilValue(edgesState)
  const setSelelted = useSetRecoilState(selectedState)

  const select = ()=> {
    
  }


  return (
    <div>
      <div>
        <p>networks</p>
        {networkList.map(network=>
          <p key={network.key} >
            {network.key}         
          </p>
          )}
        <hr/>
        <p>nodes</p>
        {nodeList.map(node=>
          <p key={node.key} >
            {node.key}         
          </p>
          )}
        <hr/>
        <p>edges</p>
        {edgeList.map(edge=>
          <p key={edge.key}>{edge.key}</p>
          )}
      </div>
    </div>
  )
}
