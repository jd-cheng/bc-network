import produce from "immer";
import { create } from "zustand";

export enum ToolType {
  DIMENSION = 'Dimension Viewer',
  BC = 'BC Builder',
  IST = 'ISTs Builder'
}

interface ToolbarState {
  tools: string []
  selected: string | null
  setTools: (tools:string[])=>void
  setSelected: (tool:string | null)=>void
}

const initialState =[
  ToolType.DIMENSION,
  ToolType.BC,
  ToolType.IST,
]

export const useToolStore = create<ToolbarState>((set)=>({
  tools: initialState,
  selected: null,
  setTools: (tools)=>set(produce((state)=>{
    state.tools = tools
  })),
  setSelected: (tool)=>set(produce((state)=>{
    state.selected = tool
  }))
}))