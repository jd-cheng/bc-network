import { createContext } from "react";
import Sigma from "sigma";

interface State {
  selectedNode: string | null;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
  selectedEdge: string | null;
}

interface ISigma {
  render: Sigma | null;
  state: State
}

export const sigmaState: State = {
  selectedNode: null,
  selectedEdge: null,
};

export const SigmaContext = createContext<Sigma | null>(null)

export const sigmaSetting = {
  enableEdgeClickEvents: true 
}

export const sigma: ISigma = {
  render: null,
  state: {
    selectedNode: null,
    selectedEdge: null
  }
} 

export const handleNode = (node: string | null) => {
    if (!sigma.render) { return }
    console.log('node:'+ node)
    const { selectedNode, selectedEdge } = sigma.state
    const network = sigma.render.getGraph()

    selectedNode && network.setNodeAttribute(selectedNode, 'highlighted', false)
    selectedEdge && network.setEdgeAttribute(selectedEdge, 'color', '')
    node && network.setNodeAttribute(node, 'highlighted', true)

    sigma.state.selectedNode = node;
    sigma.render.refresh()
}

export const handleEdge = (edge: string | null) => {
  if (!sigma.render) { return }
  console.log('edge:'+ edge)
  const { selectedNode, selectedEdge } = sigma.state
  const network = sigma.render.getGraph()

  selectedNode && network.setNodeAttribute(selectedNode, 'highlighted', false)
  selectedEdge && network.setEdgeAttribute(selectedEdge, 'color', '')
  edge && network.setEdgeAttribute(edge,'color', '#B30000')

  sigma.state.selectedEdge = edge;
  sigma.render.refresh()
}