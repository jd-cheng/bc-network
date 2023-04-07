import { EdgeAttributes, getSelectedAttributes, NetworkAttributes, NodeAttributes } from '@/lib/graph'
import { renderSelected } from '@/lib/sigma'
import { create } from 'zustand'
import { INetwork } from './networks'


export interface ISelected {
  type: 'node' | 'edge'
  key: string
  attributes: NetworkAttributes | NodeAttributes | EdgeAttributes
}


interface SelectedState {
  selected: ISelected | null
  setSelected: (network:INetwork, selected: ISelected| null) => void
}

export const useSelectedStore = create<SelectedState>((set) => ({
  selected: null,
  setSelected: (network:INetwork, selected) =>set((state) => {
    renderSelected(network.graph, selected, state.selected)
    return {selected}
  })
}))
