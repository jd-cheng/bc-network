import produce from "immer";
import { create } from "zustand";

export enum NetworkType {
  HYPER,
  CROSSED,
  TWISIED,
}

export interface INetwork {
  key: string
  name: string
  type: string
}



interface NetworkState {
  networks: INetwork[]
  openedNetwork: INetwork | null
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (network: string, index:number) => void

}

const initialState = [
  {
    key: 'hyper-1',
    name: 'hypercube-1',
    type: 'hyper',
  }
] as INetwork[]

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  openedNetwork: null ,
  addNetwork: (network)=>set(produce((state:NetworkState)=>{
    console.log('add network')
    state.networks.push(network)
  })),
  deleteNetwork: (network, index)=> set(produce((state: NetworkState)=>{
    state.networks.splice(index, 1)
  })),
}))


