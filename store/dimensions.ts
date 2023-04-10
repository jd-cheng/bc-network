import produce from "immer";
import { create } from "zustand";

export interface IDimension {
  dimension: number
  color: string
  isRendered: boolean
}


interface DimensionState {
  dimensions: IDimension[],
  setDimensions: (dimensions: IDimension[]) => void
  updateDimensionColor: (dimension: IDimension, color: string)=> void
}

const initialState = [
  {
    dimension: 1,
    color: "#b32aa9",
    isRendered: false
  },
  {
    dimension:2,
    color: "#42f595",
    isRendered: false
  }
]


export const useDimensionStore = create<DimensionState>((set)=>({
  dimensions: initialState,
  selected: null,
  setDimensions: (dimensions)=>set(produce((state)=>{
    state.dimensions = dimensions
  })),
  updateDimensionColor:(dimension, color)=>set((produce((state)=>{
    state.dimensions[dimension.dimension-1].color = color
  })))
}))