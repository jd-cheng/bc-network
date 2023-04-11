import produce from "immer";
import { create } from "zustand";



interface ToolbarState {
  tools: string []
  selected: string | null
  setTools: (tools:string[])=>void
  setSelected: (tool:string | null)=>void
}

const initialState =[
  'Dimension Controller',
  'BC Network Builder',
  'ISTs Builder',
]

export const useToolbarStore = create<ToolbarState>((set)=>({
  tools: initialState,
  selected: null,
  setTools: (tools)=>set(produce((state)=>{
    state.tools = tools
  })),
  setSelected: (tool)=>set(produce((state)=>{
    state.selected = tool
  }))
}))