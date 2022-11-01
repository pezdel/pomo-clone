import { StateCreator } from 'zustand'
import { TaskType } from '.';


export interface IdSlice{
   id: number;
   setId: () => void;
   activeId: number;
   setActiveId: (id: number) => void;
}

export const useIdSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], IdSlice>
= (set, get) => ({
   id: 0,
   setId: () => {
      set(state => {
         state.id += 1
      })
   },

   activeId: 0,
   setActiveId: (id) => {
      set({activeId: id})
   },
})



