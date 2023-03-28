import { INode } from "@/lib/graph";
import { atom, AtomEffect } from "recoil";

const nodeEffect: AtomEffect<INode[]> = ({onSet, setSelf}) =>{
  onSet((newValue, oldValue)=>{
      setSelf(newValue)
  })

} 

export const nodesState = atom<INode[]>({
  key: "nodesState",
  default: [],
  effects: [
    nodeEffect
  ]
})