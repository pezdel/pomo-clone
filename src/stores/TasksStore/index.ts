import create from 'zustand'
import type { TaskItem } from '../../utils/types'
import { sampleList } from '../../utils/utils'
import { useActiveStore } from '../ActiveStore'
import { useMainStore } from '../MainStore'



type TaskStore = {
   tasks: TaskItem[];
   remove: (id: number) => void;
   add: (task: TaskItem) => void;
   update: (id: number, item: TaskItem) => void;
   toggleComplete: (id: number) => void;
   taskDone: (id: number) => void;
}


export const useTasksStore = create<TaskStore>()((set, get) => ({
   tasks: sampleList,
   remove: (id) => set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
   })),
   add: (task) => {
      const id = useMainStore.getState().id
      set(state => ({
         tasks: [...state.tasks, {...task, 
            id: id, 
            fresh: false, 
            time: {...task.time, current: {...task.time.total}},
         }]
      }))
      useActiveStore.getState().setId(id)
      useMainStore.getState().setId()
   },
   update: (id, item) => set(state => ({
      tasks: state.tasks.map(task => task.id === id ? item : task)
   })),
   toggleComplete: (id) => set(state => ({
      tasks: state.tasks.map(task => ({
         ...task,
         complete: task.id === id ? !task.complete : task.complete
      }))
   })),
   taskDone: (id) => set(state => ({
      tasks: state.tasks.map(task => ({
         ...task,
         count: {...task.count, current: task.id === id ? task.count.current + 1 : task.count.current}
      }))
   })),
}))
