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
  deleteNetwork: (key:string) => void
  updateNetwork: (key:string, attributes: Partial<NetworkAttributes>)=>void
  setSelected: (key?: string) => void

}

export const createNetwork = (data?:any)=>{
  const graph = new Graph()
  if(data){
    graph.import(data)
  }
  const network = {key:uuidv4(), attributes:graph.getAttributes()} as INetwork

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

  deleteNetwork: (key)=> set(produce((state: NetworkState)=>{
    const index = state.networks.findIndex((network)=>network.key === key)
    state.networks.splice(index, 1)

    key === state.selected?.key &&(state.selected = undefined)

    graphs.delete(key)
  })),

  updateNetwork: (key, attributes)=>set(produce((state: NetworkState)=>{
    //update network
    const network = state.networks.find((network)=>network.key === key) as INetwork
    const newAttributes = {...network.attributes, ...attributes}
    network.attributes = newAttributes
    
    //update selected
    key === state.selected?.key && (state.selected.attributes = newAttributes)

    //update graph
    const graph = graphs.get(key) as Graph
    graph.updateAttributes(oldAttr=>({...oldAttr, ...newAttributes}))
  })),

  setSelected: (key)=>set(produce((state: NetworkState)=>{
    state.selected = state.networks.find((network)=>network.key === key)
  })),
}))


