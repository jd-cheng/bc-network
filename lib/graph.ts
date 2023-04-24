export interface NodeAttributes {
  label: string;
  size: number
  color:string
}

export interface EdgeAttributes  {
  label?: string;
  color?: string;
  size?: number;
  hidden?: boolean;
  highlighted?: boolean
} 
export interface GraphAttributes {
  name: string;
  type: string;
  dimension: number
}

export interface NetworkAttributes extends GraphAttributes{}

export interface Node {
  key: string
  attributes?: NodeAttributes
}

export interface Edge {
  key: string
  source: string
  target: string
  attributes?: EdgeAttributes
}









