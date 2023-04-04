import { INode } from '@/lib/graph';
import { Label } from '@radix-ui/react-label';
import React from 'react'





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
      <Label>Coordinate X</Label>
      <input {...register('x')}/>
      <Label>Coordinate Y</Label>
      <input {...register('y')}/>
    </form>
  )
}

