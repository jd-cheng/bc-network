import produce from "immer";
import { create } from "zustand";

export enum CursorType {
  SELECT,
  DRAG,
  ADDNODE,
}

interface CursorState {
  cursor?: CursorType
  setCursor: (cursor?:CursorType)=>void
}

export const useCursorStore = create<CursorState>((set)=>({
  cursor: CursorType.SELECT,
  setCursor: (cursor)=>set(produce((state)=>{
    state.cursor = cursor
  }))
}))