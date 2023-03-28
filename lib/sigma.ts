import { ISelected } from "@/store/selected";
import Sigma from "sigma";
import { graph } from "./graph";

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





