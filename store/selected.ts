import { renderSelected } from "@/lib/sigma";
import { atom, AtomEffect } from "recoil";

export interface ISelected {
  type: 'network' | 'node' | 'edge'  ;
  key: string 
}

const selectedEffect: AtomEffect<ISelected | null> = ({onSet, setSelf})=>{
  onSet((newValue, oldValue)=>{
    renderSelected(newValue, oldValue as ISelected | null)
    setSelf(newValue)
  })
}


const initialState = null

export const selectedState = atom<ISelected | null>({
  key: 'selectedState',
  default: initialState,
  effects: [
    selectedEffect
  ]
})