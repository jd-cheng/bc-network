import produce from "immer";
import { create } from "zustand";

export enum BuilderType{
  BC= "BC Network",
  DIMENSION= "Dimension",
  IST = "ISTs"
}

export const networkBuilder = [
  BuilderType.BC,
  BuilderType.DIMENSION
]

export const nodeBuilder = [
  BuilderType.DIMENSION,
  BuilderType.IST
]

interface BuilderState {
  selected?:BuilderType
  setSelected: (builder?:BuilderType)=>void
}

export const useBuilderStore = create<BuilderState>((set)=>({
  setSelected: (builder)=>set(produce((state)=>{
    state.selected = builder
  }))
}))