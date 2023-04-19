import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";
import hyper_data from '@/data/hyper_data.json'
import raw_data from '@/data/raw_data.json'
import crossed_data from '@/data/crossed_data.json'
import { GraphAttributes, NetworkAttributes } from "@/lib/graph";

export enum NetworkType {
  HYPER = 'hyper',
  CROSSED = 'crossed',
  TWISTED = 'twisted',
}

export const networkTypes = [
  {text: 'Hypercube', value: NetworkType.HYPER},
  {text: 'Crossed Cube', value: NetworkType.CROSSED},
  {text: 'Twisted Cube', value: NetworkType.TWISTED},
]

export interface INetwork {
  key: string,
  attributes: NetworkAttributes
} 

interface NetworkState {
  networks: INetwork[]
  selected: INetwork | null
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (index:number) => void
  setSelected: (network: INetwork| null) => void
  closeNetwork: (network: string) => void
}

export const graphs = new Map<string, Graph>()
const initialState = [
  {
    key: crypto.randomUUID(),
    attributes:{
      name: 'hypercube',
      type: NetworkType.HYPER,
      dimension: 4
    }
  },
  {
    key: crypto.randomUUID(),
    attributes:{
      name: 'crossed cube',
      type: NetworkType.CROSSED,
      dimension: 3
    }

  }
] as INetwork[]

const initialFunc = ()=>{
  const hypercube = new Graph()
  const raw = new Graph()
  const crossedcube = new Graph()
  hypercube.import(hyper_data)
  raw.import(raw_data)
  crossedcube.import(crossed_data)

  graphs.set(initialState[0].key, hypercube)
  graphs.set(initialState[1].key, crossedcube)
}

initialFunc()

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


