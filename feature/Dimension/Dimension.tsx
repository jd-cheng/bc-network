import { useNetworkStore } from '@/store/networks'
import { useSelectedStore } from '@/store/selected'
import { Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Dimension() {
  const selected = useSelectedStore((state)=>state.selected)
  const network = useNetworkStore((state)=>state.openedNetwork)
  
  return (
    <Stack direction='column'>
      
      
    </Stack>
  )
}
