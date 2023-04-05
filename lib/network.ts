import Graph from "graphology";
import { getCrossedcubeNeighborLabel } from "./crossedcube";
import { getHypercubeNeighborLabel } from "./hypercube";

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

export const getNeighborByDimension = (node: any, dimension: number, networkType: string)=>{

  //find neighbors logic hypercube
  switch(networkType){
    case 'hyper':
      return getHypercubeNeighborLabel(node, dimension)
    case 'crossed':
      return getCrossedcubeNeighborLabel(node, dimension)
  }
}