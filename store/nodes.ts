import { NodeAttributes } from '@/lib/graph'
import { renderSelectedNode } from '@/lib/sigma'
import produce from 'immer'
import { create } from 'zustand'

export interface INode {
  key: string
  attributes: NodeAttributes
}


interface NodeState {
  nodes: INode []
  selected?: string
  setNodes: (nodes:INode[]) => void
  addNode: (node: INode) => void
  deleteNode: (key: string) => void
  updateNode: (key:string, attributes:NodeAttributes) =>void
  setSelected: (key?:string) => void
}

export const useNodeStore = create<NodeState>((set) => ({
  nodes: [],
  setNodes: (nodes:INode[]) =>set(produce((state)=>{
    state.nodes = nodes
  })),

  addNode: (node:INode)=>set(produce((state)=>{
    state.nodes.push(node)
  })),

  deleteNode: (key:string)=>set(produce((state: NodeState)=>{
    const index = state.nodes.findIndex((node)=>node.key === key)
    state.nodes.splice(index,1)
  })),

  updateNode: (key:string, attributes:NodeAttributes) => set(produce((state:NodeState)=>{
    const index = state.nodes.findIndex((node)=>node.key === key)
    state.nodes[index].attributes = attributes
  })),
  
  setSelected: (key) =>set(produce((state)=>{
    state.selected = key
  }))
}))
