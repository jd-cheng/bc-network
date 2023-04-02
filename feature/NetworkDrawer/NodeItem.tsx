import ListItem from '@/components/ListItem'
import { INode } from '@/lib/graph'
import React from 'react'

interface  IProp {
  node: INode
  deleteNode: (key: string)=>void
}

export default function NodeItem({node, deleteNode}: IProp) {
  return (
    <ListItem>
      {node.attributes?.label}
      <button onClick={()=>deleteNode(node.key)}>delete</button>
    </ListItem>
  )
}
