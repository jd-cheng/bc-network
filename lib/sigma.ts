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


export const renderSelected = (network:INetwork, nextSelected:ISelected | null, preSelected:ISelected | null)=> {
  //clear previously seleced elements effect
  console.log('render select', nextSelected, preSelected)
  const { graph } = network
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
  if(nextSelected){
    const { type, key } = nextSelected

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

export const renderNeighborByDimension = (network:INetwork, node: string, dimension: number) => {
  const { graph } = network 
  const neighbor = getNeigborByDimension(network, node, dimension)

  graph.updateNodeAttribute(neighbor, 'color' ,oldVal=>'')
  
}