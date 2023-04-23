import { BuilderType, useBuilderStore } from '@/store/builder'
import { Button, FormLabel, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

interface IProp {
  builders: BuilderType[]
}

export default function BuilderSelect({builders}:IProp) {
  
  const [selected, setSelected] = useBuilderStore((state)=>[state.selected,state.setSelected])
  
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) =>{
    console.log(evt.target.value)
    setSelected(evt.target.value as BuilderType)
  }

  return (
    <>
      <FormLabel>Builder</FormLabel>
      <Select value={selected} onChange={handleChange}>
        {builders.map((builder)=>(
          <option key={builder}>{builder}</option>
        ))}
      </Select>
    </>

  )
}
