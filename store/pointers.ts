import produce from "immer";
import { create } from "zustand";

export enum PointerType {
  SELECT,
  ADDNODE,
}

interface PointerState {
  pointer: PointerType
  setPointer: (pointer:PointerType)=>void
}

export const usePointerStore = create<PointerState>((set)=>({
  pointer: PointerType.SELECT,
  setPointer: (pointer)=>set(produce((state)=>{
    state.pointer = pointer
  }))
}))