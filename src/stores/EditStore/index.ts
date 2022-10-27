import create from 'zustand'
import { editDefault } from '../../utils/utils'
import { useTasksStore } from '../TasksStore'
import { TaskItem } from '../../utils/types';



export interface IEditStore{
   task: TaskItem; 
   setTask: (id: number) => void;
   setName: (n: string) => void;
   incTime: () => void;
   decTime: () => void;
   incCount: () => void;
   decCount: () => void;
   submit: (close: () => void) => void;
}


export const useEditStore = create<IEditStore>()((set, get) => ({
   task: editDefault,
   setTask: (id) => {
      const task = useTasksStore.getState().tasks
      if(id == -1){
         set({task: editDefault})
      }else{
         set({task: task.find(task => task.id === id)})
      }
   },
   setName: (n) => {
      set(state => ({task: {...state.task, name: n}}))
   },
   incTime: () => {
      const task = get().task
      if(task.time.total.min < 60){
         set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}}})
      }
   },
   decTime: () => {
      const task = get().task
      if(task.time.total.min > 5){
         set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 5}}}})
      }
   },
   incCount: () => {
      const task = get().task
      if(task.count.total < 20){
         set({task: {...task, count: {...task.count, total: task.count.total + 1}}})
      }
   },
   decCount: () => {
      const task = get().task
      if(task.count.total > 1){
         set({task: {...task, count: {...task.count, total: task.count.total - 1}}})
      }
   },
   submit: (close) => {
      const task = get().task
      if(task.fresh){
         useTasksStore.getState().add(task)
      }else{
         useTasksStore.getState().update(task.id, task)
      }
      close()
   },
})) 

export const useCountItem = () => {
   const { task, incCount, decCount } = useEditStore()

   return{
      inc: incCount,
      dec: decCount,
      val: task.count.total
   }
}

export const useTimeItem = () => {
   const { task, incTime, decTime } = useEditStore()

   return{
      inc: incTime,
      dec: decTime,
      val: task.time.total.min
   }
}







// export type StoreType = IdStore & TaskStore
//
// export const useEditStore = create<StoreType>()((...a) => ({
//    ...useIdStore(...a),
//    ...useTaskStore(...a)
// }))
//
//
//

