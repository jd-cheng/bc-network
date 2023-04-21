import Graph from "graphology"

export const buildCrossedcube = (graph:Graph, dimension: number, start?:string)=>{
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


export const generateNeighborLabel = (node: string, dimension: number)=>{

  const reverseIdx = (idx: number)=>{
    return node.length-idx-1
  }

  if(dimension<1 || dimension>node.length){
    return ''
  }

  const diffIdx = node.length-dimension //0
  const lamda = reverseIdx(diffIdx-1)//5
  let neighbor = node //11100


  neighbor = node.substring(0,diffIdx)+(parseInt(node[diffIdx],2) ^ 1)+node.substring(diffIdx+1)

  for(let i = 0; i<Math.floor((lamda-1)/2); i++){
    const pair = neighbor.substring(neighbor.length-2*i)
    switch(pair){
      case '01':
        neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '11' + neighbor.substring(reverseIdx(2*i-1))
        break;
      case '11':
        neighbor = neighbor.substring(0, reverseIdx(2*i+1))+ '01' + neighbor.substring(reverseIdx(2*i-1))
        break;
    }
  }
  return neighbor
}

export const getEdgeByDimension = (graph:Graph, dimension:number , node?:string) =>{

  return graph.filterEdges((edge)=>{

    if(node && !graph.hasExtremity(edge, node)){
      return false
    } 
    const [nodeX, nodeY] = graph.extremities(edge)
    const labelX = graph.getNodeAttribute(nodeX, 'label')
    const labelY = graph.getNodeAttribute(nodeY, 'label')
    console.log((parseInt(labelX,2) ^ parseInt(labelY,2)))
    
    return Math.log2(parseInt(labelX,2) ^ parseInt(labelY,2))+1 === dimension
  })

}

export const isEdgeByDimension = (labelX:string, labelY:string, dimension:number)=>{
  return Math.floor(Math.log2(parseInt(labelX,2) ^ parseInt(labelY,2)))+1 === dimension
}