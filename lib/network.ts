import Graph from "graphology";
import data from "@/data.json";
import data_test from "@/data_test.json";

export const network = new Graph()
network.import(data)

export function createHypercube(){
  let graph = new Graph()

  return graph
}

export function createCrossedcube(){
  let graph = new Graph()
  graph.import(data_test)
  return graph
}

function createLocallyTwistedcube(){

}




