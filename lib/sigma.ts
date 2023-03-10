interface State {
  selectedNode?: string;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
  selectedEdge?: string;
}

export const sigmaState: State = {};