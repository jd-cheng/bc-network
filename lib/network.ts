import { INetwork } from "@/store/networks";
import { getCrossedNeighborLabel } from "./crossedcube";
import { getHyperNeighborLabel } from "./hypercube";




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


export const validataNetowrk = (network:INetwork)=>{

}

export const buildNetwork = (network:INetwork) =>{

}