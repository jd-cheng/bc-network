import { Button, FormLabel, Input } from '@chakra-ui/react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';


export interface NodeFormValues {
  label: string;
  color: string
  x: number
  y: number
}



export default function NodeForm () {
  const { control, register, handleSubmit } = useForm<NodeFormValues>();
  
  return(
    <form>
      <FormLabel>Label</FormLabel>
      <Controller
        name='label'
        control={control}
        render={({field})=>
          <Input {...field}/>
        }
      />
      <Input/>
      <FormLabel>X</FormLabel>
        <Controller
          name='label'
          control={control}
          render={({field})=>
            <Input {...field}/>
          }
        />
      <FormLabel>Y</FormLabel>
      <Button type='submit' >Edit</Button>
    </form>
  )
}

