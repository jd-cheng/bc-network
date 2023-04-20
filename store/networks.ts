import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";
import hyper_data from '@/data/hyper_data.json'
import raw_data from '@/data/raw_data.json'
import crossed_data from '@/data/crossed_data.json'
import { NetworkAttributes } from "@/lib/graph";
import {v4 as uuidv4} from 'uuid';

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
  selected?: string
  addNetwork: (network: INetwork, graph: Graph) =>void
  deleteNetwork: (key:string) => void
  updateNetwork: (key:string, attributes: NetworkAttributes)=>void
  setSelected: (key?: string) => void
  updateSelected: (attributes: NetworkAttributes)=>void

}

export const graphs = new Map<string, Graph>()
const initialState = [
  {
    key: uuidv4(),
    attributes:{
      name: 'hypercube',
      type: NetworkType.HYPER,
      dimension: 4
    }
  },
  {
    key: uuidv4(),
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

export const getGraph = (network:INetwork) => graphs.get(network.key)

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  addNetwork: (network, graph)=>set(produce((state:NetworkState)=>{
    state.networks.push(network)
    graphs.set(network.key, graph)
  })),

  deleteNetwork: (key)=> set(produce((state: NetworkState)=>{
    const index = state.networks.findIndex((network)=>network.key === key)
    state.networks.splice(index, 1)
    graphs.delete(key)
  })),

  updateNetwork: (key, attributes)=>set(produce((state: NetworkState)=>{
    const index = state.networks.findIndex((network)=>network.key === key)
    state.networks[index].attributes = attributes
  })),

  setSelected: (key)=>set(produce((state: NetworkState)=>{
    const selected = state.networks.find((network)=>network.key === key)
    state.selected = key
  })),

  updateSelected: (attributes)=>set(produce((state:NetworkState)=>{
    // if(state.selected) state.selected.attributes = attributes
  })),

}))


