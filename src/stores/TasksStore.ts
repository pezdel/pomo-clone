import create from 'zustand'
import type { TaskItem } from '../utils/types'
import { sampleList } from '../utils/utils'



interface ITasksStore {
   tasks: TaskItem[];
   id: number;
   incId: () => void;
   remove: (id: number) => void;
   add: (task: TaskItem) => void;
   update: (id: number, item: TaskItem) => void;
   toggleComplete: (id: number) => void;
   incCount: (id: number) => void;
}


export const useTasksStore = create<ITasksStore>()((set, get) => ({
   tasks: sampleList,
   id: 0,
   incId: () => set(state => ({id: state.id + 1})),
   remove: (id) => {
      const activeId = get().activeId
      set(state => ({
         tasks: state.tasks.filter(task => task.id !== id)
      }))
      if(activeId === id){
         get().setActiveId(-1)
      }
   },
   add: (task) => {
      const id = get().id
      set(state => ({
         tasks: [...state.tasks, {...task, id: id, fresh: false}]
      }))
      get().setActiveId(id)
      get().incId()
   },
   update: (id, item) => {
      set(state => ({
         tasks: state.tasks.map(task => task.id === id ? item : task)
      }))
   },
   toggleComplete: (id) => set(state => ({
      tasks: state.tasks.map(task => ({
         ...task,
         complete: task.id === id ? !task.complete : task.complete
      }))
   })),
   incCount: (id) => {
      const tasks = get().tasks
      let task = tasks.filter(task => task.id === id)[0] as TaskItem
      if(task.count.current + 1 == task.count.total){
         get().update(id, {...task,
            complete: true,
            time: {...task.time, current: task.time.total},
            count: {current: task.count.total, total: task.count.total}
         })
      }else{
         get().update(id, {...task,
            time: {...task.time, current: task.time.total},
            count: {current: task.count.current + 1, total: task.count.total}
         })
      }
   },
}))





