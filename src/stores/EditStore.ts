import create from 'zustand'
import { useMainStore } from './MainStore'
import { useTasksStore } from './'
import { editDefault } from '../utils/utils'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { SubTask, TaskItem } from '../utils/types';


export interface EditSlice{
   task: SubTask; 
   setTask: (id: number) => void;
   changeName: (n: string) => void;
   incCount: () => void;
   decCount: () => void;
   incTime: () => void;
   decTime: () => void;
}

export const useEditStore = create<EditSlice>()(
   immer(
      devtools(
         ((set) => ({
            task: editDefault,
            setTask: (id) => {
               if(id == -1){
                  set(state => {
                     state.task = editDefault
                  })
               }else{
                  const item = useTasksStore.getState().tasks.find(task => task.id === id) as TaskItem
                  set({task: {
                     min: item.time.total.min,
                     sec: 0,
                     count: item.count.total,
                     name: item.name,
                     id: item.id,
                     complete: item.complete
                  }})
               }
               useMainStore.getState().setEditModal(true)
            },

            changeName: (n) => {
               set(state => {
                  state.task.name = n
               })
            },
            incTime: () => {
               set(state => {
                  if(state.task.min < 60){
                     state.task.min += 5
                  }
               })
            },
            decTime: () => {
               set(state => {
                  if(state.task.min > 1){
                     state.task.min -= 1
                  }
               })
            },
            incCount: () => {
               set(state => {
                  if(state.task.count < 20){
                     state.task.count += 1
                  }
               })
            },
            decCount: () => {
               set(state => {
                  if(state.task.count > 0){
                     state.task.count -= 1
                  }
               })
            },
         })
      ),{name: "Edit"}
   )
))








//NON-IMMER
// export const _useEditStore = create<IEditStore>()((set, get) => ({
//    task: editDefault,
//    setTask: (id) => {
//       const task = useTasksStore.getState().tasks
//       if(id == -1){
//          set({task: editDefault})
//       }else{
//          set({task: task.find(task => task.id === id)})
//       }
//    },
//    setName: (n) => {
//       set(state => ({task: {...state.task, name: n}}))
//    },
//    incTime: () => {
//       const task = get().task
//       if(task.time.total.min < 60){
//          set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}}})
//       }
//    },
//    decTime: () => {
//       const task = get().task
//       if(task.time.total.min > 1){
//          set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 1}}}})
//       }
//    },
//    incCount: () => {
//       const task = get().task
//       if(task.count.total < 20){
//          set({task: {...task, count: {...task.count, total: task.count.total + 1}}})
//       }
//    },
//    decCount: () => {
//       const task = get().task
//       if(task.count.total > 1){
//          set({task: {...task, count: {...task.count, total: task.count.total - 1}}})
//       }
//    },
//    submit: (close) => {
//       const task = get().task
//       if(task.fresh){
//          useTasksStore.getState().add(task)
//       }else{
//          useTasksStore.getState().update(task.id, task)
//       }
//       close()
//    },
// })) 




