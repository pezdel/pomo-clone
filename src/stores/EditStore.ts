import { StateCreator } from 'zustand'
import { SubTask, TaskItem } from '../utils/types';
import { useMainStore } from './MainStore'
import { TaskType } from '.';




export interface EditSlice{
   editTask: SubTask; 
   setEditTask: (id: number) => void;
   changeName: (n: string) => void;
   incCount: () => void;
   decCount: () => void;
   incTime: () => void;
   decTime: () => void;
}



export const useEditSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], EditSlice>
= (set, get) => ({
   editTask: {min: 1, sec: 0, count: 2, name: "edit", id: -1, complete: false},
   setEditTask: (id) => {
      if(id == -1){
         set(state => {
            state.editTask = {min: 10, sec: 0, count: 1, name: "placeholder", id: -1, complete: false}
         })
      }else{
         const item = get().tasks.find(task => task.id === id) as TaskItem
         set({editTask: {
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
         state.editTask.name = n
      })
   },
   incTime: () => {
      set(state => {
         if(state.editTask.min < 60){
            state.editTask.min += 5
         }
      })
   },
   decTime: () => {
      set(state => {
         if(state.editTask.min > 1){
            state.editTask.min -= 1
         }
      })
   },
   incCount: () => {
      set(state => {
         if(state.editTask.count < 20){
            state.editTask.count += 1
         }
      })
   },
   decCount: () => {
      set(state => {
         if(state.editTask.count > 0){
            state.editTask.count -= 1
         }
      })
   },
})








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




