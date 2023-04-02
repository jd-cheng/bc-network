import { INode } from '@/lib/graph';
import { Label } from '@radix-ui/react-label';
import React from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';

type NodeFormValues  ={
  key: string;
  label: string;

}



const resolver: Resolver<NodeFormValues> =async (values) => {
  return {
    values: values,
    errors: {}
  }
}

interface IProp {
  register: any
}


export default function NodeForm ({register}:IProp) {
  
  return(
    <form>
      <Label>Key</Label>
      <input {...register('key')}/>
      <Label>Label</Label>
      <input {...register('label')}/>
      
    </form>
  )
}

