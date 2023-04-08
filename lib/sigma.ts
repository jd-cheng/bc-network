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

export const renderNeighborByDimension = (network:INetwork, node: string, dimension: number) => {
  const { graph } = network 
  const neighbor = getNeigborByDimension(network, node, dimension)

  graph.updateNodeAttribute(neighbor, 'color' ,oldVal=>'')
  
}