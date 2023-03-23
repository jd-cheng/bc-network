import Graph from "graphology";
import data from '@/data.json'

export interface NodeAttributes {
  label: string;
  color: string;
  size: number;
  hidden: boolean
}

export interface EdgeAttributes extends NodeAttributes {

} 

export type GraphAttributes = {
  name?: string;
}


export const graph = new Graph()
graph.import(data)//initiate graph