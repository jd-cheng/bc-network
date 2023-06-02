import { graphs } from "@/store/networks";
import Graph from "graphology";
import { Coordinates } from "sigma/types";
import { getEdgeByDimension, getISTByOrder } from "./network";


export const renderSetting = {
  defaultNodeSize: 10
}


export const renderSelectedNode = (network:string, nextNode?: string, preNode?: string)=> {
  
  console.log('render selected node', nextNode, preNode)
  const graph = graphs.get(network) as Graph

  //clear previously seleced elements effect
  preNode && graph.removeNodeAttribute(preNode, 'highlighted')
  //render currently selected element
  nextNode && graph.setNodeAttribute(nextNode, 'highlighted', true)

}

export const renderSelectedEdge = (network:string, nextEdge?: string, preEdge?: string)=> {
  
  console.log('render selected edge', nextEdge, preEdge)
  const graph = graphs.get(network) as Graph

  //clear previously seleced elements effect
  preEdge && graph.setEdgeAttribute(preEdge, 'color', "#B30000")
  //render currently selected element
  nextEdge && graph.setEdgeAttribute(nextEdge, 'color', "#B30000")

}

export const renderDimension = (network:string, dimension: number, color:string | null, node?: string) => {
  console.log('render dimension')
  const graph = graphs.get(network) as Graph

  const edges = getEdgeByDimension(network, dimension, node)
  edges.forEach((edge)=>{graph.updateEdgeAttribute(edge, 'color' ,oldVal=>color)})
}


export const renderDragNode = (network:string, node:string, coordinates:Coordinates ) =>{
  const graph = graphs.get(network) as Graph
  graph.setNodeAttribute(node, 'x',coordinates.x)
  graph.setNodeAttribute(node, 'y', coordinates.y)
}


export const renderIST = (network:string, root:string, index:number,color?:string) =>{
  const graph = graphs.get(network) as Graph

  const tree = getISTByOrder(network,root,index) as string[]
  console.log(tree)
  for(const edge of tree){
    graph.updateEdgeAttribute(edge,"color",oldColor=>color)
  }
}