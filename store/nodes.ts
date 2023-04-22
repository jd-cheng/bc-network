import { NodeAttributes } from '@/lib/graph'
import Graph from 'graphology'
import produce from 'immer'
import { create } from 'zustand'
import { graphs } from './networks'

export interface INode {
  key: string
  attributes: NodeAttributes
}


interface NodeState {
  nodes: string []
  selected?: string
  setNodes: (nodes: string[]) => void
  addNode: (network:string, node:INode) => void
  deleteNode: (key: string) => void
  updateNode: (network:string, node:string, attributes:NodeAttributes) =>void
  setSelected: (node?:string) => void
}

export const useNodeStore = create<NodeState>((set) => ({

  nodes: [],
  setNodes: (nodes:string[]) =>set(produce((state)=>{
    state.nodes = nodes
  })),

  addNode: (network, node)=>set(produce((state)=>{
    const graph = graphs.get(network) as Graph   // We create a new node
    graph.addNode(node.key, node.attributes);
    state.nodes.push(node.key)
  })),

  deleteNode: (key:string)=>set(produce((state: NodeState)=>{

  })),

  updateNode: (network:string, node:string, attributes:NodeAttributes) => set(produce((state:NodeState)=>{
    const graph = graphs.get(network) as Graph
    graph.updateNodeAttributes(node,preAttr=>({...preAttr, ...attributes}))
     
  })),
  
  setSelected: (node) =>set(produce((state: NodeState)=>{
    state.selected = node
  }))
}))
