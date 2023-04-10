import { INetwork } from "@/store/networks"
import { sin45 } from "@/utils/degree"

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


export const buildHypercube= (network:INetwork, start?:string)=>{
  //dimension = 1
  // 0 => 0
  // 1 => 1
  //dimension = 2
  //0 => 00
  //1 => 01
  //2 => 10
  //3 => 11

  const { graph, dimension } = network
  const labels = Array.from({length: Math.pow(2,dimension)}, (value, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  })
  // console.log('labels', labels)

  //label nodes

  if(start){
    graph.updateNodeAttribute(start, 'label', oldVal=>labels.shift())
  }

  graph.forEachNode((node)=>{
    graph.updateNodeAttribute(node, 'label', oldVal=>node !== start? labels.shift(): oldVal)
  })

  //connect nodes
  graph.forEachNode((node,{label})=>{
    // console.log(node)
    const neighborLabel = new Set(Array.from({length:dimension},(_, key)=>buildNeighborLabel(label,key+1)))
    console.log('neighborLabel', neighborLabel)
    const neighbors = graph.filterNodes((node, {label})=>{
      return neighborLabel.has(label)
    })
    // console.log('neigbors', neighbors)

    for(const neighbor of neighbors){
      if(graph.hasEdge(node, neighbor) || graph.hasEdge(neighbor, node)){
        continue
      }
      graph.addEdge(node, neighbor)
    }

  })
}



export const buildNeighborLabel = (label: string, dimension: number) =>{
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
  const neigLabel = buildNeighborLabel(nodeLabel, dimension)

  return graph.findNeighbor(node, (neighbor, attributes)=>{
    return neigLabel === attributes.label
  })
}
