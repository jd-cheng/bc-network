import { IDimension } from "@/store/dimensions";
import { INetwork } from "@/store/networks";
import { ISelected } from "@/store/selected";
import Graph from "graphology";
import Sigma from "sigma";
import { getEdgeByDimension } from "./network";

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

export const resetNetwork = (network:INetwork)=>{

}

export const renderDimension = (network:INetwork, dimension: IDimension, node?: string) => {
  console.log('render dimension')
  const { graph } = network 
  const { dimension: d, color } = dimension


  const edges = getEdgeByDimension(network, d, node)
  for(const edge of edges){
    graph.updateEdgeAttribute(edge, 'color' ,oldVal=>color)
  }
  
}


export const clearDimension  = (network: INetwork, dimension: IDimension, node?:string) => {
  const { graph } = network 
  const { dimension: d, color } = dimension


  const edges = getEdgeByDimension(network, d, node)
  for(const edge of edges){
    graph.updateNodeAttribute(edge, 'color' ,oldVal=>'')
  }

}
