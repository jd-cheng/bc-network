import React from 'react'
import hypercube_data from '@/data/hypercube.json'
import { useRecoilState } from 'recoil'
import { networksState } from '@/store/networks'
import { IEdge, graph, INetwork, INode, NetworkAttributes } from '@/lib/graph'
import { nodesState } from '@/store/nodes'
import { edgesState } from '@/store/edges'

export default function Drawer() {

  const [networkList, setNetworkList] = useRecoilState(networksState)
  const [nodeList, setNodeList] = useRecoilState(nodesState)
  const [edgeList, setEdgeList] = useRecoilState(edgesState)


  const handleAddNetwork = (network: INetwork, nodes: INode[], edges: IEdge[])=>{
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
    <div style={{maxWidth: '200px'}}>
      {/* <form>
        <label>network key</label>
        <input type='text'/>
        <label>network type</label>
        
        <label>network color</label>
        <input type='text'/>
        <label>network size</label>
        <label>nodeList</label>
        <button>add node</button>
        <label>node label</label>
        <input/>
        <label>node coordinate</label>
        <input/>
        <label>edgeList</label>
        <button>add edge</button>
        <label>source</label>
        <input/>
        <label>target</label>
        <input/>
      </form> */}
      <button onClick={() =>handleAddNetwork(
        hypercube_data.network,
        hypercube_data.nodes,
        hypercube_data.edges)}>add hypercube</button>
    </div>
  )
}
