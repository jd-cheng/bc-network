interface State {
  selectedNode?: string;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
  selectedEdges?: Set<string>;
}

export const sigmaState: State = {};