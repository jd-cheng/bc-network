import Sigma from "sigma";
import { graph } from "./graph";


interface ISigma {
  render: Sigma | null;
  state: {
    selected: ISelected | null
  }
}
export interface ISelected {
  type: 'network' | 'node' | 'edge' | null ;
  key: string 
}

export const renderSetting = {
  enableEdgeClickEvents: true 
}



export const sigma: ISigma = {
  render: null,
  state: {
    selected : null
  }
} 


export const getSelectedAttributes = (selected: ISelected) => {
  const { type, key } = selected
  switch(type){
    case 'network':
      return graph.getAttributes()
    case 'node':
      return graph.getNodeAttributes(key)
    case 'edge':
      return graph.getEdgeAttributes(key)
    case null:
      return graph.getAttributes()
  }
}


