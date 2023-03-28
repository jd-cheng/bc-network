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



const getNetworksAttributes = (key:string)=>{

}


export const getSelectedAttributes = (selected: ISelected) => {
  const { type, key } = selected
  switch(type){
    case 'network':
      return getNetworksAttributes(key)
    case 'node':
      return graph.getNodeAttributes(key)
    case 'edge':
      return graph.getEdgeAttributes(key)
  }
}


export const graph: Graph<NodeAttributes, EdgeAttributes, GraphAttributes> = new Graph();

graph.import(data_init)//initiate graph
