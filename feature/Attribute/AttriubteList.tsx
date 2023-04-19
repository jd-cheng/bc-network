import { NetworkAttributes } from '@/lib/graph'
import { INetwork, useNetworkStore } from '@/store/networks'
import { Stack } from '@chakra-ui/react'
import { Attributes } from 'graphology-types'
import React, { useEffect, useState } from 'react'
import AttributesViewer from './AttributesViewer'

export default function AttriubteList() {
  const network = useNetworkStore((state)=>state.selected)
  const [attributes, setAttributes] = useState<NetworkAttributes>()

  useEffect(()=>{
    if(! network) { return }
    setAttributes(network.attributes)

  }, [network])

  return (
    <Stack my='8px'>
      {attributes && Object.entries(attributes).map(([name, value])=>(
        <AttributesViewer key={name} name={name} value={value}/>
      ))}
    </Stack>
  )
}
