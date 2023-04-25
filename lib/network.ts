import { 
  graphs,
  NetworkType } from "@/store/networks";
import Graph from "graphology";
import {
  createNeighborLabel as generateCrossedNeighborLabel, 
  isEdgeByDimension as isCrossedEdgeByDimension, } from "./crossedcube";
import { 
  generateNeighborLabel as generateHyperNeighborLabel,
  isEdgeByDimension as isHyperEdgeByDimension,
  getISTByIndex as getHyperISTByIndex } from "./hypercube";

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

    switch(type) {
      case NetworkType.HYPER:
        return isHyperEdgeByDimension(labelX, labelY, dimension)
      case NetworkType.CROSSED:
        return isCrossedEdgeByDimension(labelX, labelY, dimension)
    }
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
        return generateHyperNeighborLabel(label,key+1)
      case NetworkType.CROSSED:
        return generateCrossedNeighborLabel(label, key+1)
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

  //asusme valid nodes
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


export const getISTByIndex =(network:string, root:string, index:number)=>{
  console.log('getISTByIndex')
  const graph = graphs.get(network) as Graph
  const type = graph.getAttribute("type")
  let tree:string[] = []
  switch(type){
    case NetworkType.HYPER:
      tree = getHyperISTByIndex(graph,root,index)
      break;
  }
  return tree
}

