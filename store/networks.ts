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
  networks: INetwork []
  selected?: INetwork
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (network:string) => void
  updateNetwork: (network:string, attributes: Partial<NetworkAttributes>)=>void
  setSelected: (network?: string) => void

}

export const createNetwork = (data?:any)=>{
  const graph = new Graph()
  if(data){
    graph.import(data)
  }
  const network = {key:uuidv4(), attributes:{}} as INetwork

  graphs.set(network.key, graph)
  return network
}

export const graphs = new Map<string, Graph>()
const initialState = [
 createNetwork(hyper_data),
 createNetwork(crossed_data)
]

export const getGraph = (network:INetwork) => graphs.get(network.key)

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  addNetwork: (network)=>set(produce((state:NetworkState)=>{
    state.networks.push(network)
    graphs.set(network.key, new Graph())
  })),

  deleteNetwork: (network)=> set(produce((state: NetworkState)=>{
    const index = state.networks.findIndex((network)=>network === network)
    state.networks.splice(index, 1)
    graphs.delete(network)
  })),

  updateNetwork: (network, attributes)=>set(produce((state: NetworkState)=>{
    const graph = graphs.get(network) as Graph
    graph.updateAttributes(preAttr=>({...preAttr, ...attributes}))
  })),

  setSelected: (network)=>set(produce((state: NetworkState)=>{
    state.selected = network
  })),



}))


