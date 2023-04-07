import { INetwork } from "@/store/networks";
import Graph from "graphology";
import { getCrossedNeighborLabel } from "./crossedcube";
import { getHyperNeighborLabel } from "./hypercube";

export function createHypercube(){
  let graph = new Graph()

  return graph
}

export function createCrossedcube(){
  let graph = new Graph()
  return graph
}

function createLocallyTwistedcube(){

}



export const getNeigborByDimension = (network:INetwork, node:string, dimension: number) =>{
  const { type, graph } = network
  const nodeLabel = graph.getNodeAttribute(node, 'label')
  let neigLabel = ''

  switch(type){
    case 'hyper':
      neigLabel = getHyperNeighborLabel(nodeLabel, dimension)
      break;
    case 'crossed':
      neigLabel = getCrossedNeighborLabel(nodeLabel, dimension)
      break
  }
    
  return graph.findNeighbor(node, (neighbor, attributes)=>{
    return neigLabel === attributes.label
  })
}