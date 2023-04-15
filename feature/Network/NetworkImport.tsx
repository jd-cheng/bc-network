import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button } from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import FileInput from './FileInput';
import { NetworkMenuType } from './NetworkMenu';



interface NetworkFormValues {
  type: string;
  name: string;
  dimension: number
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
  file: File
};

interface IProp {
  type: NetworkMenuType | null
  onClose: ()=>void
}

export default function NetworkImport({type, onClose}:IProp) {

  const { control, register, handleSubmit } = useForm<NetworkFormValues>();

  const onSubmit: SubmitHandler<NetworkFormValues> = (data)=>{

  }


  return (
    <Modal isOpen={type === NetworkMenuType.IMPORT} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FileInput control={control} name='file'/>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit(onSubmit)}>
            Import
          </Button>
          <Button variant='ghost' onClick={onClose}>Cancle</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
