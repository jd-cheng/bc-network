import { createContext } from "react";
import Sigma from "sigma";

interface State {
  selectedNode?: string;
  // State derived from hovered node:
  selectedNeighbors?: Set<string>;
  selectedEdge?: string;
}

export const sigmaState: State = {};

export const SigmaContext = createContext<Sigma | null>(null)
