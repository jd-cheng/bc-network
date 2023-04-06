import Graph from "graphology"
import { hypercube } from "@/lib/graph";

export const getGraph = (network: string) =>{
  return graphs.get(network)
}

export const addGraph = (network: string, graph: Graph) =>{
  graphs.set(network, graph)
}

const graphs = new Map<string, Graph>()
graphs.set('hyper-1', hypercube)
