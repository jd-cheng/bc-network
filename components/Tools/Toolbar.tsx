import React from 'react'
import { Stack, Button, ButtonGroup, IconButton} from '@chakra-ui/react'
import { useNetworkStore } from '@/store/networks'
import { buildHypercube } from '@/lib/hypercube'
import { useNodeStore } from '@/store/nodes'
import { buildNetwork } from '@/lib/network'

export default function Toolbar() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)

  const handleBuild = ()=>{
    if( network && !network?.graph.getAttribute('type')){
      console.log(node)
      buildNetwork(network, 'hyper', node?.key)
    }
  }


  return (
    <Stack 
      direction='row' 
      align='center' 
      //center an element in parent
      position='fixed' top='16px' right='16px' zIndex='popover'
      borderWidth='1px'
      borderRadius='md'
    >
      <ButtonGroup>
        <Button>
          dimension
        </Button>
        <Button onClick={handleBuild}>
          build
        </Button>

      </ButtonGroup>

    </Stack>
  )
}
