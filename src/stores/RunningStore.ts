import { StateCreator } from 'zustand'
import { TaskType } from '.';



export interface RunningSlice{
   running: boolean;
   start: () => void;
   stop: () => void;
}


export const useRunningSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], RunningSlice>
= (set) => ({
   running: false,
   start: () => set({running: true}),
   stop: () => set({running: false})
})



