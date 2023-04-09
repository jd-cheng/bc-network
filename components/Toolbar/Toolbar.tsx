import React from 'react'
import { Stack, Button} from '@chakra-ui/react'

export default function Toolbar() {
  return (
    <Stack 
      direction='row' 
      align='center' 
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
      <Button>
        build
      </Button>
      <Button>
        dimension
      </Button>
    </Stack>
  )
}
