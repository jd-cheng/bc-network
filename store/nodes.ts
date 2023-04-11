import { renderSelectedNode } from '@/lib/sigma'
import produce from 'immer'
import { create } from 'zustand'
import { INetwork } from './networks'


export interface INode {
  key: string
}


interface NodeState {
  selected: INode | null
  setSelected: (network:INetwork, node: INode| null) => void
}

export const useNodeStore = create<NodeState>((set) => ({
  selected: null,
  setSelected: (network:INetwork, node) =>set((state) => {
    // cannot use immer
    renderSelectedNode(network, node, state.selected)
    return {...state, selected: node}
  })
}))
