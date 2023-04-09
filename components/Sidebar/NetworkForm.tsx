import { 
  Controller, 
  Resolver, 
  SubmitHandler, 
  useForm } from 'react-hook-form';
import { 
  Button, 
  DrawerBody, 
  DrawerFooter, 
  DrawerHeader, 
  FormLabel, 
  Heading, 
  Input, 
  Select } from '@chakra-ui/react';

import React, { useRef } from 'react'
import FileInput from './FileInput';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { type } from 'os';
import NetworkList from './NetworkList';
import { useSidebarState } from '@/store/sidebar';



export interface NetworkFormValues {
  type: string;
  name: string;
  dimension: number
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
  const setType = useSidebarState((state)=>state.setType)

  const inputRef = useRef<HTMLInputElement>(null)


  const onSubmit: SubmitHandler<NetworkFormValues> = (data)=>{
    console.log('submit network')
    console.log(data)
    const { file, name, type, dimension, nodeColor, nodeSize, edgeColor, edgeSize } = data
    const fileReader = new FileReader()
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
    <>
      <DrawerHeader>
        <Heading p={1}>
          Add Network
        </Heading>
      </DrawerHeader>
      <DrawerBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>Name</FormLabel>
          <Input {...register('name')}/>
          
          <FormLabel>Type</FormLabel>
          <Select placeholder='Network Type' {...register('type')}>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          <FormLabel>Dimension</FormLabel>
          <Input {...register('dimension')}/>
          {/* <Controller
            name="type"
            control={control}
            render={({ field }) => 
              <Select placeholder='Network Type' {...field}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            }
          /> */}
          <FormLabel>File</FormLabel>
          <FileInput control={control} name='file'/>
          
          <Button type='submit' w={'100%'}>
            Submit
          </Button>
        </form>
      </DrawerBody>
      <DrawerFooter>
        <Button 
          w={'100%'}
          leftIcon={<ArrowBackIcon/>} 
          onClick={()=>setType('list')}
        >
          Back
        </Button>
      </DrawerFooter>
    </>


  )
}
