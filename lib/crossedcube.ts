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

    const neighborLabel = new Set(Array.from({length:dimension},(_, key)=>createNeighborLabel(label,key+1)))
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


export const createNeighborLabel = (nodeLabel: string, dimension: number)=>{

  const reverseIdx = (idx: number)=>{
    return nodeLabel.length-idx-1
  }

  if(dimension<1 || dimension>nodeLabel.length){
    return ''
  }

  const diffIdx = nodeLabel.length-dimension
  const lamda = reverseIdx(diffIdx-1)
  let neighborLabel = nodeLabel 


  neighborLabel = nodeLabel.substring(0,diffIdx)+(parseInt(nodeLabel[diffIdx]) ^ 1).toString(2)+nodeLabel.substring(diffIdx+1)

  for(let i = 0; i<Math.floor((lamda-1)/2); i++){
    const pair = neighborLabel.substring(reverseIdx(2*i+1),reverseIdx(2*i-1))//01
    switch(pair){
      case '01':
        neighborLabel = neighborLabel.substring(0, reverseIdx(2*i+1))+ '11' + neighborLabel.substring(reverseIdx(2*i-1))
        break;
      case '11':
        neighborLabel = neighborLabel.substring(0, reverseIdx(2*i+1))+ '01' + neighborLabel.substring(reverseIdx(2*i-1))
        break;
    }
  }
  return neighborLabel
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