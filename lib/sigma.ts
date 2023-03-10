import { createContext } from "react";
import Sigma from "sigma";

interface State {
  selectedNode: string | null;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
  selectedEdge: string | null;
}

export const sigmaState: State = {
  selectedNode: null,
  selectedEdge: null,
};

export const SigmaContext = createContext<Sigma | null>(null)
