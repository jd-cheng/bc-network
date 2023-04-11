import { IDimension } from "@/store/dimensions";
import { INetwork } from "@/store/networks";
import { getCrossedNeighborLabel } from "./crossedcube";
import { buildHypercube, getEdgeByDimension as getHyperEdgeByDimension } from "./hypercube";

export const getEdgeByDimension = (network:INetwork, dimension: number, node?:string)=>{
  console.log('get edges by dimension')
  const type = network.graph.getAttribute('type')

  switch(type){
    case "hyper":
      return getHyperEdgeByDimension(network.graph, dimension, node)
    default:
      return []
  }
}


export const buildNetwork = (network:INetwork, type: string, dimension:number, start?:string) =>{

  network.graph.updateAttributes(attr=>({
    ...attr,
    type,
    dimension,
  }))

  network.graph.clearEdges()

  switch(type){
    case 'hyper':
      buildHypercube(network.graph, dimension, start)
      break;
  }
}

export const validataNetowrk = (network:INetwork)=>{

}
