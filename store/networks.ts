import { INetwork } from "@/lib/graph"
import { atom, AtomEffect } from "recoil"




const networkEffect: AtomEffect<INetwork[]> = ({onSet, setSelf}) =>{
  onSet((newValue, oldValue)=>{
      setSelf(newValue)
  })

}  


export const networksState = atom<INetwork[]>({
  key: 'networksState',
  default: [],
  effects: [
    networkEffect
  ]
})
