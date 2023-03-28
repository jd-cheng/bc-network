import { IEdge } from "@/lib/graph";
import { atom, AtomEffect } from "recoil";


const edgeEffect: AtomEffect<IEdge[]> = ({onSet, setSelf}) =>{
  onSet((newValue, oldValue)=>{
      setSelf(newValue)
  })

} 

export const edgesState = atom<IEdge[]>({
  key: 'edgesState',
  default: [],
  effects: [
    edgeEffect
  ]

}) 