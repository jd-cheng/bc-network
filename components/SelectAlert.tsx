import { useNetworkStore } from '@/store/networks'
import { Alert, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function SelectAlert() {
  const network = useNetworkStore((state)=>state.selected)
  
  return !network?(
    <Alert 
      status="warning"
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='56px'
      position="fixed"
      top="16px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="overlay"
      width="200px"
      borderRadius="md"
      padding="md"
    >
      <AlertIcon boxSize='20px' mr={0}/>
      <Box >
        <AlertTitle>Select Network...</AlertTitle>
      </Box>
    </Alert>
  ):(
    <></>
  )
    
}
