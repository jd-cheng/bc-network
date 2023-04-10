import produce from 'immer'
import { create } from 'zustand'
import { INetwork } from './networks'



interface StageState {
  isForm: boolean
  render: string
  setForm: (isForm: boolean) => void
  setRender: (render: string) => void

}

export const useStageStore = create<StageState>((set) =>({
  isForm: false,
  render: '',
  setForm: (isForm: boolean) => set(produce((state)=>{
    state.isForm = isForm
  })),
  setRender: (render:string) =>{}
}))
