import produce from "immer";
import { create } from "zustand";

interface SidebarState {
  isOpen: boolean
  type: 'list' | 'form'
  onOpen: () =>void
  onClose: () => void
  setOpen: (isOpen: boolean)=> void
  setType: (type: string)=> void
}

export const useSidebarState = create<SidebarState>((set)=>({
  isOpen: false,
  type: 'list',
  onOpen: ()=>set(produce((state)=>{
    state.isOpen = true
  })),
  onClose: ()=>set(produce((state)=>{
    state.isOpen = false
  })),
  setOpen: (isOpen)=>set(produce((state)=>{
    state.isOpen = isOpen
  })),
  setType: (type)=>set(produce((state)=>{
    state.type = type
  }))
}))