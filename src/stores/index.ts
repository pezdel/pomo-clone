import { useMainStore } from './MainStore'
import { useTasksStore } from './TasksStore'
import { useActiveStore } from './ActiveStore'
import { useEditStore, useCountItem, useTimeItem } from './EditStore'

export {
  useMainStore,
  useTasksStore,
  useEditStore,
  useActiveStore,
  useCountItem,
  useTimeItem,
};


export const getIdx = (id: number): number => {
   return useTasksStore.getState().tasks.findIndex(task => task.id === id)
}
