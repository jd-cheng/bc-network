import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { Card, CardBody, CardHeader } from '@chakra-ui/react'
import React from 'react'

export default function AttributesList() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)

  return (
    <Card>
      <CardHeader>
      
      </CardHeader>
      <CardBody>

      </CardBody>
    </Card>
  )
}
