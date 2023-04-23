import NodeEditor from '@/feature/Editor/NodeEditor'
import { nodeBuilder } from '@/store/builder'
import React from 'react'
import BuilderSelect from './BuilderSelect'

export default function NodePanel() {
  return (
    <>
      <NodeEditor/>
      <BuilderSelect builders={nodeBuilder}/>
    </>
  )
}
