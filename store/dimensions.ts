import produce from "immer";
import { create } from "zustand";

export interface IDimension {
  key: number
  color: string
  isRender: boolean
}


interface DimensionState {
  dimensions: IDimension[],
  setDimensions: (dimensions: IDimension[]) => void
  setColor: (dimension: IDimension, color: string)=> void
  setIsRender: (dimension: IDimension, isRender:boolean)=>void

}

const initialState = [
  {
    key: 1,
    color: "#b32aa9",
    isRender: false
  },
  {
    key:2,
    color: "#42f595",
    isRender: false
  }
]


export const useDimensionStore = create<DimensionState>((set)=>({
  dimensions: [],
  selected: null,
  setDimensions: (dimensions)=>set(produce((state)=>{
    state.dimensions = dimensions
  })),
  setColor:(dimension, color)=>set((produce((state)=>{
    const { key } = dimension
    state.dimensions[key-1].color = color
  }))),
  setIsRender: (dimension, isRender) =>set(produce((state)=>{
    const { key } = dimension
    state.dimensions[key-1].isRender = isRender
  }))
}))