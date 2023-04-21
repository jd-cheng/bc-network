import { graphs, INetwork } from "@/store/networks";
import Graph from "graphology";
import { Coordinates } from "sigma/types";
import { getEdgeByDimension } from "./network";


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