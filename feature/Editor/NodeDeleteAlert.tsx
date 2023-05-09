import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure, UseDisclosureProps, useToast } from '@chakra-ui/react'
import React, { useRef } from 'react'

export default function DeleteAlert({isOpen, onClose}:Required<Pick<UseDisclosureProps, "isOpen"|"onClose">>) {


  const cancelRef = useRef(null)
  const network = useNetworkStore((state)=>state.selected)
  const [node, deleteNode] = useNodeStore((state)=>[state.selected,state.deleteNode])
  const toast = useToast()

  const handleDelete = ()=>{
    if(!network || !node) return

    deleteNode(network.key, node.key)
    onClose()
    toast({
      description: 'node successfully deleted',
      position: 'top',
      status: 'success',
      isClosable: true,
    })

  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Delete Node
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={handleDelete} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
  )
}
