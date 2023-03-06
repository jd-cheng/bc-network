import Graph from "graphology";
import data from "@/data.json";

export function createHypercube(){
  let graph = new Graph()
  graph.import(data)
  return graph
}

function createCrossedcube(){

}

function createLocallyTwistedcube(){

}




