import { renderSelected } from '@/lib/sigma'
import { Attributes } from 'graphology-types'
import produce from 'immer'
import { create } from 'zustand'
import { INetwork } from './networks'


export interface ISelected {
  type: 'node' | 'edge'
  key: string
  attributes:  Attributes
}


interface SelectedState {
  selected: ISelected | null
  setSelected: (network:INetwork, selected: ISelected| null) => void
}

export const useSelectedStore = create<SelectedState>((set) => ({
  selected: null,
  setSelected: (network:INetwork, selected) =>set((state) => {
    // cannot use immer
    renderSelected(network, selected, state.selected)
    return {...state, selected}
  })
}))
