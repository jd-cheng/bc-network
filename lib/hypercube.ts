import { INetwork } from "@/store/networks"
import { sin45 } from "@/utils/degree"
import Graph from "graphology"
export const defaultHypercubeNodePosionDimension1 = [

]


export const defaultHypercubeNodePosionDimension2 = [

]


export const defaultNodesCoordinate = [

]



export const defaultHypercubeNodePosionDimension4 = [
  [0,-1],
  [sin45, -sin45],
  [1, 0],
  [sin45, sin45],
  [0, 1],
  [-sin45, sin45],
  [-1,0],
  [-sin45, -sin45],
  //outer
  [0,-2],
  [sin45*2, -sin45*2],
  [2, 0],
  [sin45*2, sin45*2],
  [0, 2],
  [-sin45*2, sin45*2],
  [-2,0],
  [-sin45*2, -sin45*2]
]


export const buildHypercube= (node:string, label:string)=>{

}



export const getHyperNeighborLabel = (label: string, dimension: number) =>{
  if(dimension<1 || dimension>label.length){
    return ''
  }

  const diffIndex = label.length-dimension
  const diffBit: any = label[diffIndex]

  return label.substring(0,diffIndex)+(diffBit ^ 1)+label.substring(diffIndex+1)

}

export const getNeigbor = (network:INetwork, node:string, dimension: number) =>{
  const { graph } = network
  const nodeLabel = graph.getNodeAttribute(node, 'label')
  const neigLabel = getHyperNeighborLabel(nodeLabel, dimension)

  return graph.findNeighbor(node, (neighbor, attributes)=>{
    return neigLabel === attributes.label
  })
}
