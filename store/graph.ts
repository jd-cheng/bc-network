import { addNetwork, graph, IEdge, INetwork, INode } from "@/lib/graph";
import produce from "immer";
import { create } from "zustand";

/**
 * only accept key and label for each element
 */

interface GraphState {
  networks: INetwork[]
  nodes: INode[]
  edges: IEdge[]
  addNetwork: (newNetwork: INetwork) => void
  addNodes: (newNodes: INode[]) => void
  addEdges: (newEdges: IEdge[]) => void
}

export const useGraphStore = create<GraphState>((set)=>({
  networks: [],
  nodes: [],
  edges: [],
  addNetwork: (newNetwork)=>set(produce((state: GraphState)=>{
    console.log('add network', newNetwork)
    addNetwork(newNetwork)
    state.networks.push(newNetwork)
  })),

  addNodes: (newNodes)=>set(produce((state: GraphState)=>{
    console.log('add nodes', newNodes)
    for( const node of newNodes ){
      graph.addNode(node.key, node.attributes)
    }
    state.nodes.concat(newNodes)
  })),
  
  addEdges: (newEdges)=>set(produce((state: GraphState)=>{
    console.log('add edges', newEdges)
    for( const edge of newEdges){
      graph.addEdgeWithKey(edge.key, edge.source, edge.target, edge.attributes)
    }
    state.edges.concat(newEdges)
  })),
}))