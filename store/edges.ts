import { EdgeAttributes } from "@/lib/graph"
import Graph from "graphology"
import produce from "immer"
import { create } from "zustand"
import { graphs } from "./networks"
import {v4 as uuidv4} from 'uuid';
export interface IEdge {
  key:string
  attributes?: EdgeAttributes
}

interface EdgeState {
  edges: IEdge []
  selected?: IEdge
  setedges: (edges: IEdge[]) => void
  addedge: (network:string, source:string, target:string) => void
  deleteEdge: (network:string, key: string) => void
  updateEdge: (network:string, key:string, attributes:Partial<EdgeAttributes>) =>void
  setSelected: (key?:string) => void
}

export const useEdgeStore = create<EdgeState>((set) => ({
  edges: [],
  setedges: (edges:IEdge[]) =>set(produce((state)=>{
    state.edges = edges
  })),

  addedge: (network, source, target)=>set(produce((state)=>{

    const graph = graphs.get(network) as Graph
    const key = uuidv4()   // We create a new edge
    graph.addEdgeWithKey(key,source,target,{size:5})
    state.edges.push({key:key})//avoid coordinates

  })),

  deleteEdge: (network:string, key:string)=>set(produce((state: EdgeState)=>{
    const index = state.edges.findIndex((edge)=>edge.key === key)
    state.edges.splice(index,1)

    key === state.selected?.key && (state.selected = undefined)

    const graph = graphs.get(network) as Graph
    graph.dropEdge(key)
  })),

  updateEdge: (network:string, key:string, attributes:Partial<EdgeAttributes>) => set(produce((state:EdgeState)=>{
    const edge = state.edges.find((edge)=>edge.key === key) as IEdge
    const newAttributes = {...edge.attributes, ...attributes}

    edge.attributes = newAttributes
    key === state.selected?.key && (state.selected.attributes = newAttributes)

    const graph = graphs.get(network) as Graph
    graph.updateEdgeAttributes(key,oldAttr=>({...oldAttr, ...newAttributes}))
    console.log(graph.getEdgeAttribute(key,"label"))     
  })),
  
  setSelected: (key) =>set(produce((state: EdgeState)=>{
    state.selected = state.edges.find((edge)=>edge.key === key)
  }))
}))