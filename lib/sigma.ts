import { graphs } from "@/store/networks";
import Graph from "graphology";
import { Coordinates } from "sigma/types";
import { getEdgeByDimension, getISTByIndex } from "./network";


export const renderSetting = {
  defaultNodeSize: 10
}


export const renderSelectedNode = (network:string, nextNode?: string, preNode?: string)=> {
  
  console.log('render selected node', nextNode, preNode)
  const graph = graphs.get(network) as Graph
  console.log(graph)

  //clear previously seleced elements effect
  preNode && graph.setNodeAttribute(preNode, 'highlighted',false)
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


export const renderIST = (network:string, root:string, index:number,color?:string) =>{
  const graph = graphs.get(network) as Graph

  const tree = getISTByIndex(network,root,index) as string[]

  for(const edge of tree){
    graph.updateEdgeAttribute(edge,"color",oldColor=>color)
  }

  // const trees = getISTs(graph, root) as any[][]
  // tree[index].forEach(([nodeSource,nodeTarget])=>{
  //   const edge = graph.findEdge((edge)=>{
  //     return graph.hasExtremity(edge, nodeSource) && graph.hasExtremity(edge,nodeTarget)
  //   })
  //   graph.updateEdgeAttribute(edge,"color",olvC=>"#B30000")
  // })

}