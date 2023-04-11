import React from 'react'
import { Stack, Button} from '@chakra-ui/react'
import { useNetworkStore } from '@/store/networks'
import { buildHypercube } from '@/lib/hypercube'
import { useSelectedStore } from '@/store/selected'
import { buildNetwork } from '@/lib/network'

export default function Toolbar() {

  const network = useNetworkStore((state)=>state.openedNetwork)
  const selected = useSelectedStore((state)=>state.selected)

  const handleBuild = ()=>{
    if( network?.type === 'raw'){
      console.log(selected)
      buildNetwork(network, 'hyper', selected?.key)
    }
  }


  return (
    <Stack 
      direction='row' 
      align='center' 
      //center an element in parent
      position='absolute'
      bottom='16px'
      left= '50%'
      transform= 'translateX(-50%)'
    >
      <Button>
        select
      </Button>
      <Button>
        edit
      </Button>
      <Button onClick={handleBuild}>
        build
      </Button>
      <Button>
        dimension
      </Button>
    </Stack>
  )
}
