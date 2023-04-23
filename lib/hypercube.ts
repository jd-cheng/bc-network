import { graphs, INetwork } from "@/store/networks"
import { sin45 } from "@/utils/degree"
import Graph from "graphology"


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


export const buildHypercube= (graph:Graph, dimension: number, start?:string)=>{
  const labels = Array.from({length: Math.pow(2,dimension)}, (value, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  })

  //label nodes

  if(start){
    graph.updateNodeAttribute(start, 'label', oldVal=>labels.shift())
  }

  graph.forEachNode((node)=>{
    graph.updateNodeAttribute(node, 'label', oldVal=>node !== start? labels.shift(): oldVal)
  })

  //connect nodes
  graph.forEachNode((node,{label})=>{

    const neighborLabel = new Set(Array.from({length:dimension},(_, key)=>generateNeighborLabel(label,key+1)))
    console.log('neighborLabel', neighborLabel)
    const neighbors = graph.filterNodes((node, {label})=>{
      return neighborLabel.has(label)
    })

    for(const neighbor of neighbors){
      if(graph.hasEdge(node, neighbor) || graph.hasEdge(neighbor, node)){
        continue
      }
      graph.addEdge(node, neighbor,{size:5})
    }

  })
}


export const generateNeighborLabel = (label: string, dimension: number) =>{
  if(dimension<1 || dimension>label.length){
    return ''
  }

  const diffIndex = label.length-dimension
  const diffBit: any = label[diffIndex]

  return label.substring(0,diffIndex)+(diffBit ^ 1)+label.substring(diffIndex+1)

}

export const getEdgeByDimension = (graph:Graph, dimension:number , node?:string) =>{

  return graph.filterEdges((edge)=>{

    if(node && !graph.hasExtremity(edge, node)){
      return false
    } 
    const [nodeX, nodeY] = graph.extremities(edge)
    const labelX = graph.getNodeAttribute(nodeX, 'label')
    const labelY = graph.getNodeAttribute(nodeY, 'label')
    
    return Math.log2(parseInt(labelX,2) ^ parseInt(labelY,2))+1 === dimension
  })
}



export const isEdgeByDimension = (labelX:string, labelY:string, dimension:number)=>{
  return Math.log2(parseInt(labelX,2) ^ parseInt(labelY,2))+1 === dimension
}

export const getNeighborByDimension = (graph: Graph, node:string, dimension:number)=>{
  const nodeLabel = graph.getNodeAttribute(node,"label")
  const neighborLabel = generateNeighborLabel(nodeLabel,dimension)
  return graph.findNeighbor(node, (neighbour,{label})=>{
    return neighborLabel === label
  })
}

export const getISTs = (graph:Graph, root:string)=>{

  const dimension  = graph.getAttribute("dimension")
  const trees:any = []
  const arrs = [
    [2,3,4,1],
    [3,4,1,2],
    [4,1,2,3],
    [1,2,3,4]
  ]


  arrs.forEach((arr,index)=>{
    const tree = []
    const queue = [getNeighborByDimension(graph,root,index+1)]
    for(let i = 0; i< dimension; i++){
      const d = queue.length
      for(let j = 0;j < d;j++){
        const source = queue[j] as string
        const target = getNeighborByDimension(graph,source,arr[i])
        queue.push(target)
        tree.push([graph.getNodeAttribute(source,"label"),graph.getNodeAttribute(target,"label")])
      }
    }

    trees.push(tree)
  })

  console.log(trees)
  return trees
}

export const getISTWithEdges = (graph:Graph, root:string, index:number)=>{

  const dimension  = graph.getAttribute("dimension")
  const trees:any = []
  const arrs = [

    [2,3,4,1], //(j+1)%3
    [3,4,1,2],
    [4,1,2,3],
      [1,2,3,4], //(j+1)%4
  ]
  // const arrs = Array.from({length:dimension},(value,index)=>{
  //   const tmp = Array.from({length:dimension},(value,index)=>{
  //     return index+1
  //   })

  //   for(let k = 0; k< index;k++){
  //     const head = tmp.shift() as number
  //     tmp.push(head)
  //   }
  //   return tmp
  // })


  arrs.forEach((arr,index)=>{
    const tree = []
    const queue = [getNeighborByDimension(graph,root,index+1)]
    for(let i = 0; i< dimension; i++){
      const d = queue.length
      for(let j = 0;j < d;j++){
        const source = queue[j] as string
        const target = getNeighborByDimension(graph,source,arr[i])
        queue.push(target)
        tree.push(graph.findEdge((edge)=>{
          return graph.hasExtremity(edge,source) && graph.hasExtremity(edge,target)
        }))
      }
    }
    trees.push(tree)
  })

  return trees[index]
}


export const getISTWithEdgesByIndex = (graph:Graph, root:string, index:number)=>{

  const dimension  = graph.getAttribute("dimension")
  const arr = Array.from({length:dimension},(value,index)=>{
    return index+1
  })  

  for(let k = 0; k< index;k++){
    const head = arr.shift() as number
    arr.push(head)
  }
  console.log(arr)

  const tree:string[] = []
  const queue = [getNeighborByDimension(graph,root,index+1)]
  for(let i = 0; i< dimension; i++){
    const d = queue.length
    for(let j = 0;j < d;j++){
      const source = queue[j] as string
      const target = getNeighborByDimension(graph,source,arr[i])
      queue.push(target)
      tree.push(graph.findEdge((edge)=>{
        return graph.hasExtremity(edge,source) && graph.hasExtremity(edge,target)
      })as string)
    }
  }
  console.log(tree)
  return tree
}