import { hypercube } from "@/lib/graph";
import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";

export enum NetworkType {
  HYPER,
  CROSSED,
  TWISIED,
  RAW
}

export interface INetwork {
  key: string
  type: string
  dimension: number
  graph: Graph
}



interface NetworkState {
  networks: INetwork[]
  openedNetwork: INetwork | null
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (index:number) => void
  openNetwork: (network: INetwork) => void
  closeNetwork: (network: string) => void
}

const initialState = [
  {
    key: 'hyper-1',
    type: 'hyper',
    dimension: 4,
    graph: hypercube
  }
] as INetwork[]

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  openedNetwork: null ,
  addNetwork: (network)=>set(produce((state:NetworkState)=>{
    console.log('add network')
    state.networks.push(network)
  })),
  deleteNetwork: (index)=> set(produce((state: NetworkState)=>{
    state.networks.splice(index, 1)
  })),
  openNetwork: (network)=>set(produce((state)=>{
    state.openedNetwork = network
  })),
  closeNetwork: (network)=>null
}))


