import create from 'zustand'
import { useMainStore } from './MainStore'
import { useTasksSlice, TaskSlice } from './TasksStore'
import { useEditSlice, EditSlice } from './EditStore'
import { useActiveSlice, ActiveSlice } from './ActiveStore'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export {
  useMainStore,
};

export type TaskType = TaskSlice & EditSlice & ActiveSlice


export const useTasksStore = create<TaskType>()(
   immer(
      devtools(
         (...a) => ({
            ...useTasksSlice(...a),
            ...useEditSlice(...a),
            ...useActiveSlice(...a),
         })
      )
   )
)


