import create from 'zustand'
import { devtools } from 'zustand/middleware'


interface RunningSlice{
   running: boolean;
   start: () => void;
   stop: () => void;
}

export const useRunningStore = create<RunningSlice>()(
   devtools(
      ((set) => ({
         running: false,
         start: () => set({running: true}),
         stop: () => set({running: false})
         })
      )
   )
)



