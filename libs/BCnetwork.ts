import Graph from "graphology";
import data from "@/data.json";

function initNetwork(){
  let graph = new Graph()
  graph.import(data)
  return graph
}

export const graph = initNetwork()



