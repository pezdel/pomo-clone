import { StateCreator } from 'zustand'
import type { TaskItem } from '../../utils/types'
import { useMainStore } from '../MainStore'
import { TaskType } from '..'
import { useTasksStore } from '..'

interface EditObj {
   name: string;
   count: number;
   time: number;
}


export interface TaskSlice {
   id: number
   setId: () => void;
   tasks: TaskItem[];
   add: (item: EditObj) => void;
   remove: (id: number) => void;
   update: (id: number, item: EditObj) => void;
   toggleComplete: (id: number) => void;
}



export const useTasksSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], TaskSlice> 
= (set, get) => ({

   id: 0,
   setId: () => {
      set(state => {
         state.id += 1
      })
   },
   tasks: [],
   add: (item) => {
      set(state => {
         state.tasks.push({
            name: item.name,
            id: state.id,
            time: {current: {min: item.time, sec: 0}, total: {min: item.time, sec: 0}},
            count: {current: 0, total: item.count},
            complete: false,
            fresh: false,
         })
      })
   },
   remove: (id) => {
      set(state => {
         const idx = state.tasks.findIndex(task => task.id === id)
         state.tasks.splice(idx, 1)
      })
      updateActiveIndex()
   },
   update: (id, item) => {
      set(state => {
         const task = state.tasks.find(task => task.id === id)
         if(task){
            task.name = item.name
            task.count.total = item.count
            task.time.current.min = item.time
            task.time.total.min = item.time
         }
      })
   },
   toggleComplete: (id) => {
      set(state => {
         const task = state.tasks.find(task => task.id === id)
         if(task){
            task.complete = !task.complete
         }
      })
   },
})


const updateActiveIndex = () => {
   const tasks = useTasksStore.getState().tasks
   if(tasks[0] != undefined){
         useTasksStore.getState().setActiveId(tasks[0].id)
      }
   useMainStore.getState().setEditModal(false)
}

//NON IMMER
// export const useTasksStore = create<TaskStore>()((set, get) => ({
//    tasks: sampleList,
//    remove: (id) => set(state => ({
//       tasks: state.tasks.filter(task => task.id !== id)
//    })),
//    add: (task) => {
//       const id = useMainStore.getState().id
//       set(state => ({
//          tasks: [...state.tasks, {...task, 
//             id: id, 
//             fresh: false, 
//             time: {...task.time, current: {...task.time.total}},
//          }]
//       }))
//       useActiveStore.getState().setId(id)
//       useMainStore.getState().setId()
//    },
//    update: (id, item) => set(state => ({
//       tasks: state.tasks.map(task => task.id === id ? item : task)
//    })),
//    toggleComplete: (id) => set(state => ({
//       tasks: state.tasks.map(task => ({
//          ...task,
//          complete: task.id === id ? !task.complete : task.complete
//       }))
//    })),
// }))






