import { 
  Button, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement } from '@chakra-ui/react'
import { 
  useController, 
  UseControllerProps } from 'react-hook-form';
import React, { useRef } from 'react'
import { AttachmentIcon } from '@chakra-ui/icons'
import { NetworkFormValues } from '../../refactor/Sidebar/NetworkForm';




export default function FileInput(props: UseControllerProps<NetworkFormValues>) {


  const inputRef = useRef<HTMLInputElement>(null)
  const { field: {ref, value, onChange, ...inputProps}} = useController(props);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none">
        <AttachmentIcon/>
      </InputLeftElement>
      <input 
        type='file'
        style={{display: 'none'}}
        ref={inputRef}
        onChange={(evt)=>evt.target.files && onChange(evt.target.files[0])}
        {...inputProps} 
      />
      <Input
        value={value instanceof File? value.name : ''}
        placeholder={"Your file ..."}
        readOnly        
      />
      <InputRightElement width='5.5rem'>
        <Button h='1.75rem' size='sm' m='1' onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>
      </InputRightElement>
    </InputGroup>  
  )
}
