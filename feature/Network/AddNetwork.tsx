import { createNetwork, useNetworkStore } from '@/store/networks';
import { AddIcon } from '@chakra-ui/icons'
import { IconButton, useToast } from '@chakra-ui/react'
import React from 'react'

export default function AddNetwork() {

  const [addNetwork, setNetwork] = useNetworkStore((state)=>[state.addNetwork, state.setSelected])
  const toast = useToast()

  const handleAddNetwork = ()=>{
    const network = createNetwork()
    addNetwork(network)
    setNetwork(network.key)
    toast({
      description: 'network successfully added',
      position: 'top',
      status: 'success',
      isClosable: true,
    })
  }
  return (
    <IconButton
      aria-label=''
      icon={<AddIcon/>}
      onClick={handleAddNetwork}
    />
  )
}

