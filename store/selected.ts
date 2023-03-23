
import { graph } from "@/lib/graph";
import { ISelected, sigma } from "@/lib/sigma";
import { atom, AtomEffect } from "recoil";

const selectedEffect: AtomEffect<ISelected> = ({onSet, setSelf})=>{
  onSet((newValue, oldValue)=>{
    if(!sigma.render) { return }
    console.log(newValue)
    const { render, state } = sigma

    /**
     * clear previously seleced elements effect
     */ 
    const { type: oldType, key: oldKey } = oldValue

    switch(oldType){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(oldKey, 'highlighted', false)
        break;
      case 'edge':
        graph.setEdgeAttribute(oldKey, 'color','')
        break;
    }


    /**
     * render currently selected element
     */
    const { type: newType, key: newKey } = newValue
    
    switch(newType){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(newKey, 'highlighted', true)
        break;
      case 'edge':
        graph.setEdgeAttribute(newKey, 'color', '#B30000')
        break;
    }


    setSelf(newValue)
    render.refresh()

  })
}


const initialState:ISelected = {
  type: null,
  key: ''

}

export const selectedState = atom<ISelected>({
  key: 'selectedState',
  default: initialState,
  effects: [
    selectedEffect
  ]
})