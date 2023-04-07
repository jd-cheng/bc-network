import { INetwork } from "@/store/networks";
import { ISelected } from "@/store/selected";
import Graph from "graphology";
import Sigma from "sigma";
import { getNeigborByDimension } from "./network";

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


export const renderSelected = (graph:Graph, curSelected:ISelected | null, preSelected:ISelected | null)=> {
  //clear previously seleced elements effect

  if(preSelected){
    const { type, key } = preSelected

    switch(type){
      case 'node':
        graph.updateNodeAttribute(key, 'highlighted', oldVal=>false)
        break;
      case 'edge':
        graph.updateEdgeAttribute(key, 'color',oldVal=>'')
        break;
    }
  }

  //render currently selected element
  if(curSelected){
    const { type, key } = curSelected

    switch(type){
      case 'node':
        graph.updateNodeAttribute(key, 'highlighted', oldVal=>true)
        break;
      case 'edge':
        graph.updateEdgeAttribute(key, 'color', oldVal=>'#B30000')
        break;
    }
  }

}


// export const renderNetwork = (network: INetwork) =>{
//   console.log('render network')
//   const { attributes: networkAttributes } = network
//   const { nodeColor, nodeSize, edgeColor, edgeSize } = networkAttributes as NetworkAttributes

//   if(networkAttributes){
//     updateNetworkAttributes(network.key, networkAttributes)
//   }


//   graph.forEachNode((node, attributes)=>{    
//     if(attributes.network !== network.key){ return }

//     attributes.color = nodeColor
//     attributes.size = nodeSize
//     graph.updateNodeAttributes(node, oldVal=>attributes)

//   })
    
//   graph.forEachEdge((edge, attributes)=>{
//     if(attributes.network !== network.key) { return }

//     attributes.color = edgeColor
//     attributes.size = edgeSize
//     graph.updateEdgeAttributes(edge, oldVal=>attributes)
//   })

// }


// export const renderNode = (node: INode) =>{
//   const {key, attributes} = node 
//   graph.updateNodeAttributes(key, oldVal=>({...oldVal, ...attributes }))

// }

// export const renderEdge = (edge: IEdge) =>{
//   const {key, attributes} = edge 
//   graph.updateEdgeAttributes(key, oldVal=>({...oldVal, ...attributes }))

// }

export const renderNeighborByDimension = (network:INetwork, node: string, dimension: number) => {
  const { graph } = network 
  const neighbor = getNeigborByDimension(network, node, dimension)

  graph.updateNodeAttribute(neighbor, 'color' ,oldVal=>'')
  
}