import NetworkEditor from '@/feature/Editor/NetworkEditor'
import { networkBuilder } from '@/store/builder'
import React from 'react'
import BuilderSelect from './BuilderSelect'

export default function NetworkPanel() {
  return (
    <>
      <NetworkEditor/>
      <BuilderSelect builders={networkBuilder}/>
    </>
  )
}
