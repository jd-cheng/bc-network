import Graph from "graphology";
import { Attributes } from "graphology-types";
import Sigma from "sigma";
import data from '@/data.json'

interface ISigma {
  render: Sigma | null;
  state: {
    selected: ISelected | null
  }
}
export interface ISelected {
  type: 'network' | 'node' | 'edge' ;
  key: string 
}

export const renderSetting = {
  enableEdgeClickEvents: true 
}

export const graph = new Graph()
graph.import(data)

export const sigma: ISigma = {
  render: null,
  state: {
    selected : null
  }
} 

export const setSelected = (selected: ISelected | null) =>{
  if (!sigma.render) { return }
  console.log(selected)
  const { render, state } = sigma

  /**
   * clear previously seleced elements
   */

  if(state.selected) {
    const { type, key } = state.selected
    switch(type){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(key, 'highlighted', false)
        break;
      case 'edge':
        graph.setEdgeAttribute(key, 'color','')
        break;
    }
  }

  /**
   * set currently selected element
   */

  if(selected){
    const { type, key } = selected

    switch(type){
      case 'network':
        break;
      case 'node':
        graph.setNodeAttribute(key, 'highlighted', true)
        break;
      case 'edge':
        graph.setEdgeAttribute(key, 'color', '#B30000')
        break;
    }
  }

  sigma.state.selected = selected
  render.refresh()

}

export const getSelectedAttributes = (selected: ISelected) => {
  const { type, key } = selected
  switch(type){
    case 'network':
      return graph.getAttributes()
    case 'node':
      return graph.getNodeAttributes(key)
    case 'edge':
      return graph.getEdgeAttributes(key)
  }
}

// export const handleNode = (node: string | null) => {
//     if (!sigma.render) { return }
//     console.log('node:'+ node)
//     const { selectedNode, selectedEdge } = sigma.state

//     selectedNode && network.setNodeAttribute(selectedNode, 'highlighted', false)
//     selectedEdge && network.setEdgeAttribute(selectedEdge, 'color', '')
//     node && network.setNodeAttribute(node, 'highlighted', true)

//     sigma.state.selectedNode = node;
//     sigma.render.refresh()

// }

// export const handleEdge = (edge: string | null) => {
//   if (!sigma.render) { return }
//   console.log('edge:'+ edge)
//   const { selectedNode, selectedEdge } = sigma.state

//   selectedNode && network.setNodeAttribute(selectedNode, 'highlighted', false)
//   selectedEdge && network.setEdgeAttribute(selectedEdge, 'color', '')
//   edge && network.setEdgeAttribute(edge,'color', '#B30000')

//   sigma.state.selectedEdge = edge;
//   sigma.render.refresh()

// }

