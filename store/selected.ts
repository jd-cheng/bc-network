import { EdgeAttributes, getSelectedAttributes, NetworkAttributes, NodeAttributes } from '@/lib/graph'
import { renderSelected } from '@/lib/sigma'
import { create } from 'zustand'

export interface ISelected {
  type: 'network' | 'node' | 'edge'
  key: string
  attributes: NetworkAttributes | NodeAttributes | EdgeAttributes
}


interface SelectedState {
  selected: ISelected | null
  setSelected: (selected: ISelected| null) => void
}

export const useSelectedStore = create<SelectedState>((set) => ({
  selected: null,
  setSelected: (selected) =>set((state) => {
    renderSelected(selected, state.selected)
    return {selected}
  })
}))
