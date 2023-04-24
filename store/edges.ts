import { EdgeAttributes } from "@/lib/graph"

export interface IEdge {
  key:string
  source:string
  target:string
  attributes?: EdgeAttributes
}