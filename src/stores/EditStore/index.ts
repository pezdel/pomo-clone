import { StateCreator } from 'zustand'
import { TaskItem } from '../../utils/types';
import { useMainStore } from '../MainStore'
import { TaskType } from '..';


interface EditObj {
   time: number;
   count: number;
   name: string;
   id: number;
}
export interface EditSlice{
   editTask: EditObj; 
   updateTask: (id: number) => void;
   addTask: () => void;
   setName: (n: string) => void;
   incCount: () => void;
   decCount: () => void;
   incTime: () => void;
   decTime: () => void;
   submit: (task: EditObj) => void;
}


export const useEditSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], EditSlice>
= (set, get) => ({
   editTask: {time: 1, count: 2, name: "edit", id: -1},
   addTask: () => {
      set({
         editTask: {time: 30, count: 1, name: "placeholder", id: -1}
      })
      useMainStore.getState().setEditModal(true)
   },
   updateTask: (id) => {
      const item = get().tasks.find(task => task.id === id) as TaskItem
      set({editTask: {
         time: item.time.total.min,
         count: item.count.total,
         name: item.name,
         id: item.id,
      }})
      useMainStore.getState().setEditModal(true)
   },
   setName: (n) => {
      set(state => {
         state.editTask.name = n
      })
   },
   incTime: () => {
      set(state => {
         if(state.editTask.time < 60){
            state.editTask.time += 5
         }
      })
   },
   decTime: () => {
      set(state => {
         if(state.editTask.time > 1){
            state.editTask.time -= 1
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
   submit: (task) => {
      if(task.id == -1){
         get().add(task)
         get().setActiveId(get().id)
         get().setId()
      }else{
         get().update(task.id, task)
      }
      useMainStore.getState().setEditModal(false)
   }
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




