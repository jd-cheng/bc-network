import hyper_data from '@/data/hyper_data.json'
import raw_data from '@/data/raw_data.json'
import { INetwork } from '@/store/networks';
import { ISelected } from "@/store/selected";
import Graph from 'graphology';

export interface NodeAttributes {
  x?: number;
  y?: number;
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
}

export interface EdgeAttributes  {
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
} 

export interface NetworkAttributes {
  type?: string
  nodeColor?: string
  nodeSize?: number
  edgeColor?: string
  edgeSize?: number
  label?: string
}

export interface GraphAttributes {
  name: string;
}



export interface INode {
  key: string
  attributes?: NodeAttributes
}

export interface IEdge {
  key: string
  source: string
  target: string
  attributes?: EdgeAttributes
}


// export const updateNetworkAttributes = (networkKey: string, attributes: NetworkAttributes) =>{
//   graph.updateAttribute('networks', oldVal=>{
//     if(!oldVal) { console.log('network does not exist', networkKey);return [] }

//     const networks = oldVal
//     networks.forEach((network)=>{
//       if(network.key !== networkKey) { return }

//       network.attributes = attributes
//     })

//     return networks
//   })
// }

// export const getNetworkAttributes = (networkKey:string)=>{
//   return graph.getAttribute('networks').find((network)=>{
//     return network.key === networkKey
//   })

// }




export const getSelectedAttributes = (network: INetwork, selected: ISelected) => {
  const { type, key } = selected
  const { graph } = network
  switch(type){
    case 'node':
      return graph.getNodeAttributes(key)
    case 'edge':
      return graph.getEdgeAttributes(key)
  }
}



export const hypercube = new Graph()
export const raw = new Graph()
hypercube.import(hyper_data)
raw.import(raw_data)