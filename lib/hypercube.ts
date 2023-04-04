import { sin45 } from "@/utils/degree"
import { graph } from "./graph"

export const hypercubePosition = [
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

  const dimension = 4
  // const initialLabel = '0000'
  graph.updateNodeAttribute(node, 'label', oldVal=>label)

  const neighborLabels = []

  for( let d = 1; d<= dimension; d++){
    const neighborLabel = getHypercubeNeighborLabel(node,d)
    neighborLabels.push(neighborLabel)
  }
  
  graph.forEachNode((node, {label})=>{
    if(label){ return }
    for( let d = 1; d<= dimension; d++){
      const neighborLabel = getHypercubeNeighborLabel(node,d)
      graph.updateNodeAttribute(node, 'label', oldVal=>neighborLabel)
    }
    
  })
}





//000 , 001  i = 2 d= 1 len = 3
//100, 110 i = 1 d = 2 len = 3

export const getHypercubeNeighborLabel = (label: string, dimension: number) =>{
  if(dimension<1 || dimension>label.length){
    return ''
  }

  const diffIndex = label.length-dimension
  const diffBit: any = label[diffIndex]

  return label.substring(0,diffIndex)+(diffBit ^ 1)+label.substring(diffIndex+1)

}

export const getHypercubeNeighbor = (node:string, dimension: number) =>{
  const label = graph.getNodeAttribute(node, 'label')

  if(!label){ return }

  const neighborLabel = getHypercubeNeighborLabel(label, dimension)
  
  return graph.findNode((node,{label})=>{
    return label === neighborLabel
  })
}