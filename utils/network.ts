import { INode } from "@/store/nodes";

export const converNodeLabel = (node:INode, dimension:number)=>{
  if(!node.attributes.label) return

  const label = node.attributes.label
  if(dimension > label.length){

  }

  if(dimension < label.length){

  }
 
  const labels = Array.from({length: Math.pow(2,dimension)}, (value, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  })
}