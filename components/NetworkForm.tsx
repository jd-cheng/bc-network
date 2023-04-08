import { 
  Controller, 
  Resolver, 
  SubmitHandler, 
  useForm } from 'react-hook-form';
import { 
  Button, 
  FormLabel, 
  Input, 
  Select } from '@chakra-ui/react';
import FileInput from './Sidebar/FileInput';
import { v1 as uuidv1 } from 'uuid';
import React, { useRef } from 'react'



export interface NetworkFormValues {
  type: string;
  name: string;
  nodeColor: string
  nodeSize: number
  edgeColor: string
  edgeSize: number
  file: File
};

const resolver: Resolver<NetworkFormValues> = async (values) => {
  return {
    values: values,
    errors: {}
  };
};

export default function NetworkForm() {
  const { control, register, handleSubmit } = useForm<NetworkFormValues>({ resolver });

  const inputRef = useRef<HTMLInputElement>(null)


  const onSubmit: SubmitHandler<NetworkFormValues> = (data)=>{
    console.log('submit network')
    console.log(data)
    const { file, name, type, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const fileReader = new FileReader()
    // const key = uuidv1()
    // const graph = new Graph()

    // const network = {
    //   key,
    //   name,
    //   type,
    //   graph
    // }


    const readFile = ()=>{
      console.log('read file')
      const  result  = fileReader.result as string
      const data = JSON.parse(result)
      console.log(data)
      // graph.import(data)
      // addGraph(key, graph)
    }
    fileReader.onloadend = readFile
    fileReader.readAsText(file)
    // addNetwork({key, type, name})

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Name</FormLabel>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      
      <FormLabel>Type</FormLabel>
      <Controller
        name="type"
        control={control}
        render={({ field }) => 
          <Select placeholder='Network Type' {...field}>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
        }
      />
      <FormLabel>File</FormLabel>
      <FileInput control={control} name='file'/>
      
      <Button type='submit' w={'100%'}>
        Submit
      </Button>
    </form>
  )
}
