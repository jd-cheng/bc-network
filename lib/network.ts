import Graph from "graphology";
import { graph } from "./graph";

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
      return getHypercubeNeighbor(node, dimension)
    case 'crossed':
      return getCrossedcubeNeighbor(node, dimension)
  }
}


//000 , 001  i = 2 d= 1 len = 3
//100, 110 i = 1 d = 2 len = 3

const getHypercubeNeighbor = (node: string, dimension: number) =>{
  if(dimension<1 || dimension>node.length){
    return -1
  }

  const diffIndex = node.length-dimension
  const diffBit: any = node[diffIndex]

  return node.substring(0,diffIndex)+(diffBit ^ 1)+node.substring(diffIndex+1)

}

const getCrossedcubeNeighbor = (node: string, dimension: number)=>{
  if(dimension<1 || dimension>node.length){
    return -1
  }

  
}

const getTwistedcubeNeighbor = (node: string, dimension: number) =>{

}



