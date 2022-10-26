import create from 'zustand'
import type { TaskItem } from '../../utils/types'
import { sampleList } from '../../utils/utils'
import { useActiveStore } from '../ActiveStore'
import { useIdStore } from '../IdStore'




type State = {
   tasks: TaskItem[];
}
type Actions = {
   remove: (id: number) => void;
   add: (task: TaskItem) => void;
   update: (id: number, item: TaskItem) => void;
   toggleComplete: (id: number) => void;
   taskDone: (id: number) => void;
}




export const useTasksStore = create<State & Actions>()((set, get) => ({
   tasks: sampleList,
   remove: (id) => set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
   })),
   add: (task) => {
      const id = useIdStore.getState().id
      set(state => ({
         tasks: [...state.tasks, {...task, id: id, fresh: false}]
      }))
      useActiveStore.getState().setActiveId(id)
      useIdStore.getState().setId()
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
   }))
}))



// export const useTasksStore = create(immer<State & Actions>((set, get) => ({
// // export const useTasksStore = create<ITasksStore>()((set, get) => ({
//    tasks: sampleList,
//    add: (task) => {
//       set(state => {
//          state.tasks.push(task)
//       })
//       // useActiveStore.getState().setActiveTask({...task, id: id, fresh: false})
//    },
//    remove: (id) => set(state => {
//       const idk = state.tasks.findIndex(task => task.id === id)
//       state.tasks.splice(idk, 1)
//    }),
//    update: (id, item) => set(state => {
//       let idk = state.tasks.find(task => task.id === id)
//       if(idk != undefined){
//          idk = item 
//       }
//    }),
//    toggleComplete: (id) => set(state => {
//       const idx = state.tasks.findIndex(task => task.id === id)
//       //@ts-ignore
//       state.tasks[idx].complete = !state.tasks[idx]?.complete
//    }),
//    taskDone: (id) => set(state => {
//       const idx = state.tasks.findIndex(task => task.id === id)
//       //@ts-ignore
//       state.tasks[idx].count.current++
//    }),
// })))



// interface ITasksStore {
//    tasks: TaskItem[];
//    id: number;
//    incId: () => void;
//    remove: (id: number) => void;
//    add: (task: TaskItem) => void;
//    update: (id: number, item: TaskItem) => void;
//    toggleComplete: (id: number) => void;
//    taskDone: (id: number) => void;
// }
