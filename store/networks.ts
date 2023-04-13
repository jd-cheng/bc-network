import { hypercube, raw } from "@/lib/graph";
import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";

export enum NetworkType {
  HYPER = 'hyper',
  CROSSED = 'crossed',
  TWISTED = 'twisted',
}

export const networkTypes = [
  NetworkType.HYPER,
  NetworkType.CROSSED,
  NetworkType.TWISTED
]

export interface INetwork {
  key: string
  graph: Graph
}



interface NetworkState {
  networks: INetwork[]
  selected: INetwork | null
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (index:number) => void
  setSelected: (network: INetwork| null) => void
  closeNetwork: (network: string) => void
}

const initialState = [
  {
    key: 'hyper',
    graph: hypercube
  },
  {
    key: 'raw',
    graph: raw
  }
] as INetwork[]

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  selected: null ,
  addNetwork: (network)=>set(produce((state:NetworkState)=>{
    console.log('add network')
    state.networks.push(network)
  })),
  deleteNetwork: (index)=> set(produce((state: NetworkState)=>{
    state.networks.splice(index, 1)
  })),
  setSelected: (network)=>set(produce((state)=>{
    state.selected = network
  })),
  closeNetwork: (network)=>null
}))


