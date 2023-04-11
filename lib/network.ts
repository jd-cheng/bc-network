import { IDimension } from "@/store/dimensions";
import { INetwork } from "@/store/networks";
import { getCrossedNeighborLabel } from "./crossedcube";
import { buildHypercube, getEdgeByDimension as getHyperEdgeByDimension } from "./hypercube";



export const getEdgeByDimension = (network:INetwork, dimension: number, node?:string)=>{
  switch(network.type){
    case "hyper":
      return getHyperEdgeByDimension(network.graph, dimension, node)
    default:
      return []
  }
}


export const validataNetowrk = (network:INetwork)=>{

}

export const buildNetwork = (network:INetwork, type: string, start?:string) =>{

  switch(type){
    case 'hyper':
      buildHypercube(network.graph, network.dimension, start)
      break;
  }
}