import { useIdStore, IdStore } from "./id";
import { useTaskStore, TaskStore } from './task'
import create from 'zustand'

export type StoreType = IdStore & TaskStore

export const useEditStore = create<StoreType>()((...a) => ({
   ...useIdStore(...a),
   ...useTaskStore(...a)
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