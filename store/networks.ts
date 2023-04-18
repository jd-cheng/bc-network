import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";
import hyper_data from '@/data/hyper_data.json'
import raw_data from '@/data/raw_data.json'
import crossed_data from '@/data/crossed_data.json'

export enum NetworkType {
  HYPER = 'hyper',
  CROSSED = 'crossed',
  TWISTED = 'twisted',
}


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

export const hypercube = new Graph()
export const raw = new Graph()
export const crossedcube = new Graph()
hypercube.import(hyper_data)
raw.import(raw_data)
crossedcube.import(crossed_data)

const initialState = [
  {
    key: 'hyper',
    graph: hypercube
  },
  {
    key: 'crossed',
    graph: crossedcube
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


