import produce from "immer";
import { create } from "zustand";
import { INetwork } from "./networks";

export enum NetworkType {
  HYPER,
  CROSSED,
  TWISIED,
}


interface OpenedState {
  openedNetwork: INetwork | null
  openNetwork: (network: INetwork) => void
  closeNetwork: (network: string) => void
}

export const useOpenedStore = create<OpenedState>((set)=>({
  openedNetwork: null ,
  openNetwork: (network)=>set(produce((state)=>{
    state.openedNetwork = network
  })),
  closeNetwork: (network)=>null
}))
