import { EdgeAttributes, getSelectedAttributes, NetworkAttributes, NodeAttributes } from '@/lib/graph'
import { renderSelected } from '@/lib/sigma'
import Graph from 'graphology'
import { create } from 'zustand'
import { getGraph } from './graphs'


export interface ISelected {
  type: 'network' | 'node' | 'edge'
  key: string
  attributes: NetworkAttributes | NodeAttributes | EdgeAttributes
}


interface SelectedState {
  selected: ISelected | null
  setSelected: (network:string, selected: ISelected| null) => void
}

export const useSelectedStore = create<SelectedState>((set) => ({
  selected: null,
  setSelected: (network, selected) =>set((state) => {
    const graph = getGraph(network) as Graph
    renderSelected(graph, selected, state.selected)
    return {selected}
  })
}))
