import React from 'react'
import { Stack, Button} from '@chakra-ui/react'

export default function Toolbar() {
  return (
    <Stack direction='row' align='center'>
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
