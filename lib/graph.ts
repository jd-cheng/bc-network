import Graph from "graphology";
import data_init from '@/data/data_init.json'
import { ISelected } from "@/store/selected";

export interface NodeAttributes {
  x?: number;
  y?: number;
  network?: string;
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
}

export interface EdgeAttributes  {
  network?: string;
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
  networks: INetwork[]
}

export interface INetwork {
  key: string
  attributes?: NetworkAttributes
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


export const addNetwork = (network: INetwork) => {
  graph.updateAttribute('networks', oldVal=>{
    if(!oldVal){
      return [network]
    }
    return [...oldVal, network]
  })
}

export const updateNetworkAttributes = (networkKey: string, attributes: NetworkAttributes) =>{
  graph.updateAttribute('networks', oldVal=>{
    if(!oldVal) { console.log('network does not exist', networkKey);return [] }

    const networks = oldVal
    networks.forEach((network)=>{
      if(network.key !== networkKey) { return }

      network.attributes = attributes
    })

    return networks
  })
}

export const getNetworkAttributes = (networkKey:string)=>{
  return graph.getAttribute('networks').find((network)=>{
    return network.key === networkKey
  })

}




export const getSelectedAttributes = (selected: ISelected) => {
  const { type, key } = selected
  switch(type){
    case 'network':
      return getNetworkAttributes(key)
    case 'node':
      return graph.getNodeAttributes(key)
    case 'edge':
      return graph.getEdgeAttributes(key)
  }
}


export const graph: Graph<NodeAttributes, EdgeAttributes, GraphAttributes> = new Graph();

graph.import(data_init)//initiate graph
