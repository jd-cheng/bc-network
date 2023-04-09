import produce from "immer";
import { create } from "zustand";

interface DrawerState {
  isOpen: boolean
  onOpen: () =>void
  onClose: () => void
  setOpen: (isOpen: boolean)=> void
}

export const useSidebarState = create<DrawerState>((set)=>({
  isOpen: false,
  onOpen: ()=>set(produce((state)=>{
    state.isOpen = true
  })),
  onClose: ()=>set(produce((state)=>{
    state.isOpen = false
  })),
  setOpen: (isOpen)=>set(produce((state)=>{
    state.isOpen = isOpen
  }))
}))