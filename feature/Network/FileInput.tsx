import { 
  Button, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { AttachmentIcon } from '@chakra-ui/icons'


interface IProp {
  setGraphData: (data:any)=>void
}

export default function FileInput({setGraphData}:IProp) {

  const [fileName, setFileName] = useState<string>()

  const handleFile = (file:File)=>{
    const fileReader = new FileReader()

    const readFile = ()=>{
      console.log('read file')
      const  result  = fileReader.result as string
      const data = JSON.parse(result)
      setGraphData(data)

    }
    fileReader.onloadend = readFile
    fileReader.readAsText(file)
    setFileName(file.name)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  // const { field: {ref, value, onChange, ...inputProps}} = useController(props);

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
        onChange={(evt)=>evt.target.files && handleFile(evt.target.files[0])}

      />
      <Input
        value={fileName?fileName: ''}
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
