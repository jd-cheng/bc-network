import { EdgeAttributes } from '@/lib/graph'
import { useEdgeStore } from '@/store/edges'
import { useNetworkStore } from '@/store/networks'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDisclosure, FormControl, FormLabel, IconButton, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NodeDeleteAlert from './NodeDeleteAlert'

export default function EdgeEditor() {
  
  const network = useNetworkStore((state)=>state.selected)
  const [edge,updateEdge,deleteEdge] = useEdgeStore((state)=>[state.selected,state.updateEdge,state.deleteEdge])
  const {register, setValue } = useForm<{source:string,target:string}>({
    mode:"onChange"
  })
  const {isOpen, onClose, onOpen} = useDisclosure()



  return (
    <>
      <form>
        <FormControl>
          <FormLabel display="flex" mr="0" alignItems="center" justifyContent="space-between">
              Label
              <IconButton
                aria-label=''
                icon={<DeleteIcon/>}
                size="xs"
                variant="outline"
                colorScheme="red"
                onClick={()=>network&&edge&&onOpen()}
                isDisabled={!edge}
              />
            </FormLabel>
          <Input {...register('source')}/>
        </FormControl>
        <FormControl>
          <FormLabel display="flex" mr="0" alignItems="center" justifyContent="space-between">
              Label
              <IconButton
                aria-label=''
                icon={<DeleteIcon/>}
                size="xs"
                variant="outline"
                colorScheme="red"
                onClick={()=>network&&edge&&onOpen()}
                isDisabled={!edge}
              />
            </FormLabel>
          <Input {...register('target')}/>
        </FormControl>
      </form>
      <NodeDeleteAlert isOpen={isOpen} onClose={onClose}/>
    </>
  )
}


