import { NodeAttributes } from '@/lib/graph'
import Graph from 'graphology'
import produce from 'immer'
import { create } from 'zustand'
import { graphs } from './networks'

export interface INode {
  key: string
  attributes: Partial<NodeAttributes>
}


interface NodeState {
  nodes: INode []
  selected?: INode
  setNodes: (nodes: INode[]) => void
  addNode: (network:string, node:INode) => void
  deleteNode: (network:string, key: string) => void
  updateNode: (network:string, key:string, attributes:Partial<NodeAttributes>) =>void
  setSelected: (key?:string) => void
}

export const useNodeStore = create<NodeState>((set) => ({

  nodes: [],
  setNodes: (nodes:INode[]) =>set(produce((state)=>{
    state.nodes = nodes
  })),

  addNode: (network, node)=>set(produce((state)=>{

    state.nodes.push(node)
    const graph = graphs.get(network) as Graph   // We create a new node
    graph.addNode(node.key, node.attributes);

  })),

  deleteNode: (network:string, key:string)=>set(produce((state: NodeState)=>{
    const index = state.nodes.findIndex((node)=>node.key === key)
    state.nodes.splice(index,1)

    key === state.selected?.key && (state.selected = undefined)

    const graph = graphs.get(network) as Graph
    graph.dropNode(key)
  })),

  updateNode: (network:string, key:string, attributes:Partial<NodeAttributes>) => set(produce((state:NodeState)=>{


    const node = state.nodes.find((node)=>node.key === key) as INode
    const newAttributes = {...node.attributes, ...attributes}

    node.attributes = newAttributes

    key === state.selected?.key && (state.selected.attributes = newAttributes)

    const graph = graphs.get(network) as Graph
    graph.updateNodeAttributes(key,oldAttr=>({...oldAttr, ...newAttributes}))
    console.log(graph.getNodeAttribute(key,"label"))     
  })),
  
  setSelected: (key) =>set(produce((state: NodeState)=>{
    state.selected = state.nodes.find((node)=>node.key === key)
  }))
}))
