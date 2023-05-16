import { 
  graphs,
  NetworkType } from "@/store/networks";
import Graph from "graphology";
import {
  createNeighborLabel as createCrossedNeighborLabel, 
  isEdgeByDimension as isCrossedEdgeByDimension, } from "./crossedcube";
import { 
  createNeighborLabel as createHyperNeighborLabel,
  isEdgeByDimension as isHyperEdgeByDimension } from "./hypercube";


export const isEdgeByDimension = (labelX:string, labelY:string, dimension:number)=>{
  return Math.floor(Math.log2(parseInt(labelX,2) ^ parseInt(labelY,2)))+1 === dimension
}


export const getEdgeByDimension = (network:string, dimension: number, node?:string)=>{
  console.log('get edges by dimension')
  const graph = graphs.get(network) as Graph
  const type = graph.getAttribute('type')

  return graph.filterEdges((edge)=>{

    if(node && !graph.hasExtremity(edge, node)){
      return false
    } 
    const [nodeX, nodeY] = graph.extremities(edge)
    const labelX = graph.getNodeAttribute(nodeX, 'label')
    const labelY = graph.getNodeAttribute(nodeY, 'label')

    return isEdgeByDimension(labelX, labelY, dimension)
  })
}



export const createNodeLabels = (dimension:number) =>{
  return Array.from({length: Math.pow(2,dimension)}, (_, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  })
}



export const createNeighborLabels = (type:NetworkType, dimension:number, label:string) =>{
  return Array.from({length:dimension},(_, key)=>{
    switch(type){
      case NetworkType.HYPER:
        return createHyperNeighborLabel(label,key+1)
      case NetworkType.CROSSED:
        return createCrossedNeighborLabel(label, key+1)
    }
  })
}



export const buildNetwork = (network:string, type: NetworkType, start?:string) =>{

  const graph = graphs.get(network) as Graph
  const dimension = graph.getAttribute('dimension')
  
  graph.updateAttributes(attr=>({
    ...attr,
    type,
  }))

  graph.clearEdges()


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
    const neighborLabel = new Set(createNeighborLabels(type,dimension,label))

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



export const getMissingNodes = (network:string)=>{
  const graph = graphs.get(network) as Graph
  const dimension = graph.getAttribute("dimension")
  const labels = new Set(createNodeLabels(dimension))

  graph.forEachNode((node,{label})=>{
    if(labels.has(label)){
      labels.delete(label)
    }
  })

  return Array.from(labels)
}



export const getMissingEdges=(network:string)=>{
  const graph = graphs.get(network) as Graph
  const { type, dimension } = graph.getAttributes()

  const edges = new Set<string>()
  const nodeLabels = createNodeLabels(dimension)
  nodeLabels.forEach((nodeLabel)=>{
    const neighborLabels = createNeighborLabels(type,dimension,nodeLabel)
    neighborLabels.forEach((neighborLabel)=>{
      const edgeLabel = nodeLabel+" - "+ neighborLabel
      const rEdgeLabel = neighborLabel+" - "+ nodeLabel
      !edges.has(edgeLabel) && !edges.has(rEdgeLabel) && edges.add(nodeLabel+" - "+ neighborLabel)
    })
  })

  graph.forEachEdge((edge)=>{
    const sourceLabel = graph.getNodeAttribute(graph.source(edge), "label")
    const targetLabel = graph.getNodeAttribute(graph.target(edge), "label")

    const edgeLabel = sourceLabel+" - "+ targetLabel
    const rEdgeLabel = targetLabel+" - "+ sourceLabel
    edges.delete(edgeLabel)
    edges.delete(rEdgeLabel)
  })
  return Array.from(edges)
}



export const createNeighborLabelByDimension = (networkType:NetworkType ,nodeLabel:string, dimension:number)=>{
  switch(networkType){
    case NetworkType.HYPER:
      return createHyperNeighborLabel(nodeLabel, dimension)
    case NetworkType.CROSSED:
      return createCrossedNeighborLabel(nodeLabel, dimension)
  }
}



export const getNeighborByDimension = (network:string, node:string, dimension:number)=>{
  console.log(node)
  const graph = graphs.get(network) as Graph
  const { type } = graph.getAttributes()
  const nodeLabel = graph.getNodeAttribute(node,"label")

  let neighborLabel= createNeighborLabelByDimension(type,nodeLabel,dimension)

  return graph.findNeighbor(node, (neighbour,{label})=>{
    return neighborLabel === label
  })
}




export const getISTByOrder =(network:string, root:string, order:number)=>{
  console.log('getISTByIndex')
  const graph = graphs.get(network) as Graph
  const {dimension} = graph.getAttributes()


  const arr = Array.from({length:dimension},(value,index)=>{
    return index+1
  })  


  const tree:string[] = []
  const queue = [getNeighborByDimension(network,root,order)]
  for(let i = 0; i< dimension; i++){
    const d = queue.length
    for(let j = 0;j < d;j++){
      const index = (order+i)%dimension
      const source = queue[j] as string
      const target = getNeighborByDimension(network,source,arr[index])
      queue.push(target)
      tree.push(graph.findEdge((edge)=>{
        return graph.hasExtremity(edge,source) && graph.hasExtremity(edge,target)
      })as string)
    }
  }
  return tree
}




export const buildeNodes = (network:string)=>{
  const graph = graphs.get(network) as Graph
  const {dimension} = graph.getAttributes()

  const nodeLabels = new Set(createNodeLabels(dimension))

  nodeLabels.forEach((nodeLabel)=>{
    const node = graph.findNode((node,{label})=>{
      //normal convert
      //
      if(nodeLabel.length>label.length && nodeLabel.substring(nodeLabel.length-label.length) === label){
        graph.setNodeAttribute(node,"label",nodeLabel)
      }

      if(nodeLabel.length<label.length && "0".repeat(nodeLabel.length-label.length).concat(nodeLabel) === label)
        graph.setNodeAttribute(node,"label",nodeLabel)
    })
  })

  graph.forEachNode((node,{label})=>{
    if(!label){

    }
  })

}



export const buildEdges = (network:string) =>{

  const graph = graphs.get(network) as Graph
  const {type, dimension} = graph.getAttributes()

  //assume nodes are valid
  //connect nodes
  graph.forEachNode((node,{label})=>{
    const neighborLabel = new Set(createNeighborLabels(type,dimension,label))

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