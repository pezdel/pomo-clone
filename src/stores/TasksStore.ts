import create from 'zustand'
import type { SubTask, TaskItem } from '../utils/types'
import { useMainStore } from './MainStore'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'


export interface TaskSlice {
   tasks: TaskItem[];
   update: (id: number, item: TaskItem) => void;
   saveEdit: (id: number, item: SubTask) => void;
   saveActive: (id: number, item: SubTask) => void;
   resetTime: (id: number) => void;
   toggleComplete: (id: number) => void;
   remove: (id: number) => void;
}


export const useTasksStore = create<TaskSlice>()(
   immer(
      devtools(
         subscribeWithSelector(
            (set => ({
               tasks: [],
               update: (id, item) => {
                  set(state => {
                     const idx = state.tasks.findIndex(task => task.id === id)
                     state.tasks[idx] = item
                  })
               },
               saveEdit: (id, item) => {
                  if(id == -1){
                     const id = useMainStore.getState().id
                     const setId = useMainStore.getState().setId
                     const setActiveId = useMainStore.getState().setActiveId
                     set(state => {
                        state.tasks.push({
                           id: id,
                           name: item.name === 'What are you doing?' ? 'Task '+id : item.name,
                           time: {current: {min: item.min, sec: 0}, total: {min: item.min, sec: 0}},
                           count: {current: 0, total: item.count},
                           complete: false,
                           fresh: false,
                        })
                        setActiveId(id)
                     })
                     setId()
                  }else{
                     set(state => {
                        const task = state.tasks.find(task => task.id === id)
                        if(task){
                           task.name = item.name
                           task.time.total = {min: item.min, sec: item.sec},
                           task.time.current = {min: item.min, sec: item.sec},
                           task.count.total = item.count
                        }
                     })
                  }
                  useMainStore.getState().setEditModal(false)
               },
               saveActive: (id, item) => {
                  set(state => {
                     const task = state.tasks.find(task => task.id === id)
                     if(task) {
                        task.time.current = {min: item.min, sec: item.sec},
                        task.count.current = item.count
                        if(task.count.current == task.count.total){
                           task.complete = true
                        }
                     }
                  })
               },
               resetTime: (id) => {
                  set(state => {
                     const task = state.tasks.find(task => task.id === id)
                     if(task){
                        task.time.current = task.time.total
                     }
                  })
               },
               toggleComplete: (id) => {
                  set(state => {
                     const task = state.tasks.find(task => task.id === id)
                     if(task) {
                        task.complete = !task.complete
                        if(task.complete){
                           task.count.current = task.count.total
                        }else{
                           task.count.current = 0
                        }
                     }
                  })
               },
               remove: (id) => {
                  set(state => {
                     const idx = state.tasks.findIndex(task => task.id === id)
                     state.tasks.splice(idx, 1)
                  })
                  useMainStore.getState().setEditModal(false)
               },
            })
         )
      ), {name: "Tasks"}
   )
))
   

//not in use, was used to reset the active id when we remove the active task
// const updateActiveIndex = () => {
//    const tasks = useTasksStore.getState().tasks
//    if(tasks[0] != undefined){
//          useTasksStore.getState().setActiveId(tasks[0].id)
//       }
//    useMainStore.getState().setEditModal(false)
// }

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






