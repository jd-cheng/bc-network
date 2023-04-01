import React, { HTMLProps } from 'react'
import hypercube_data from '@/data/hypercube.json'
import { useRecoilState } from 'recoil'
import { networksState } from '@/store/networks'
import { IEdge, graph, INetwork, INode, NetworkAttributes } from '@/lib/graph'
import { nodesState } from '@/store/nodes'
import { edgesState } from '@/store/edges'
import styles from './NetworkDrawer.module.css'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import * as RadixLabel from '@radix-ui/react-label';


export default function Drawer() {

  const [networkList, setNetworkList] = useRecoilState(networksState)
  const [nodeList, setNodeList] = useRecoilState(nodesState)
  const [edgeList, setEdgeList] = useRecoilState(edgesState)


  const drawNetwork = (network: INetwork, nodes: INode[], edges: IEdge[])=>{
    console.log('add network')
    const { attributes: networkAttributes } = network
    const { nodeColor, nodeSize, edgeColor, edgeSize } = networkAttributes as NetworkAttributes

    graph.updateAttribute('networks', (oldNetworks)=>{
      if(!oldNetworks){
        return [network]
      }
      return [...oldNetworks, network]
    } )

      
    for (const node of nodes) {
      const { key, attributes: nodeAttribute } = node
      graph.addNode(key, {
        color:nodeColor, 
        size: nodeSize, 
        network: network.key, 
        ...nodeAttribute
      })
    }

    for( const edge of edges ){
      const { source, target, key, attributes: edgeAttributes } = edge
      graph.addEdgeWithKey(key, source, target, {
        color:edgeColor, 
        size: edgeSize, 
        network: network.key, 
        ...edgeAttributes
      })
    }

    setNetworkList([...networkList, network ])
    setNodeList([...nodeList, ...nodes])
    setEdgeList([...edgeList, ...edges])
  }


  return (
    <div className={styles.wrapper}>
      <Label>Key</Label>
      <Input type='text'/>
      <Label>Type</Label>
            
      <Label>Color</Label>
      <input type='text'/>
      <Label>node size</Label>

      <label>nodeList</label>
      <button>add node</button>
      <button onClick={() =>drawNetwork(
        hypercube_data.network,
        hypercube_data.nodes,
        hypercube_data.edges)}>add hypercube</button>
    </div>
  )
}



const Label = ({children}:{children?: React.ReactNode})=>{
  return (
    <RadixLabel.Root className="text-[15px] font-medium leading-[35px] text-white">
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