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


export const buildHypercube= (network:INetwork, node:string, dimension: number)=>{
  const { graph } = network
  const nodeLabel = ''
  const nodes = graph.nodes() 
  const neigLabels: string[] = []
  const neighbor: string[] = []
  let p = 0

  graph.updateNodeAttribute(node, 'label', oldVal=>nodeLabel)
  while(p<nodes.length){

    for(let i = 1; i<=dimension; i++){
      neigLabels.push(getHyperNeighborLabel(nodeLabel, dimension))
    }
  
    do{
      if(nodes[p] !== node){
        graph.updateNodeAttribute(nodes[p], 'label', oldVal=>neigLabels.shift())
        graph.addEdge(node, node[p])

        neighbor.push(node[p])
        p++
      }
    } while(p%dimension !== 0)
  }




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
