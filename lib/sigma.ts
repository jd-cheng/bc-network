import { ISelected } from "@/store/selected";
import Sigma from "sigma";
import { graph, IEdge, INetwork, INode, NetworkAttributes, updateNetworkAttributes } from "./graph";

interface ISigma {
  render: Sigma | null;
}


export const renderSetting = {
  enableEdgeClickEvents: true,
  allowInvalidContainer: true 
}



export const sigma: ISigma = {
  render: null,
} 


export const renderSelected = (curSelected:ISelected | null, preSelected:ISelected | null)=> {
  if(!sigma.render) { return }
  const { render } = sigma

  //clear previously seleced elements effect

  if(preSelected){
    const { type, key } = preSelected

    switch(type){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(key, 'highlighted', false)
        break;
      case 'edge':
        graph.setEdgeAttribute(key, 'color','')
        break;
    }
  }

  //render currently selected element
  if(curSelected){
    const { type, key } = curSelected

    switch(type){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(key, 'highlighted', true)
        break;
      case 'edge':
        graph.setEdgeAttribute(key, 'color', '#B30000')
        break;
    }
  }

  render.refresh()

}


export const renderNetwork = (network: INetwork) =>{
  console.log('render network')
  const { attributes: networkAttributes } = network
  const { nodeColor, nodeSize, edgeColor, edgeSize } = networkAttributes as NetworkAttributes

  if(networkAttributes){
    updateNetworkAttributes(network.key, networkAttributes)
  }


  graph.forEachNode((node, attributes)=>{    
    if(attributes.network !== network.key){ return }

    attributes.color = nodeColor
    attributes.size = nodeSize
    graph.updateNodeAttributes(node, oldVal=>attributes)

  })
    
  graph.forEachEdge((edge, attributes)=>{
    if(attributes.network !== network.key) { return }

    attributes.color = edgeColor
    attributes.size = edgeSize
    graph.updateEdgeAttributes(edge, oldVal=>attributes)
  })

}


export const renderNode = (node: INode) =>{
  const {key, attributes} = node 
  graph.updateNodeAttributes(key, oldVal=>({...oldVal, ...attributes }))

}

export const renderEdge = (edge: IEdge) =>{
  const {key, attributes} = edge 
  graph.updateEdgeAttributes(key, oldVal=>({...oldVal, ...attributes }))

}