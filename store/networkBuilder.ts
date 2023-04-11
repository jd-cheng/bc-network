import produce from "immer";
import { create } from "zustand";
import { NetworkType } from "./networks";



interface NetworkBuilderState {
  builders: NetworkType[]
  selected: NetworkType | null
  setBuilders:(builders: NetworkType[])=>void
  setSelected:(builder: NetworkType)=>void
}

const initialState = [
  NetworkType.HYPER,
  NetworkType.CROSSED
]

export const useNetworkBuilderStore = create<NetworkBuilderState>((set)=>({
  builders: initialState,
  selected: null,
  setBuilders: (builders)=>set(produce((state)=>{
    state.builders = builders
  })),
  setSelected: (builder)=>set(produce((state)=>{
    state.selected = builder
  }))
}))