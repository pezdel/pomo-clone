import { useEffect, useState } from 'react'
import type { TaskItem } from '../../utils/types'
import { useEditStore, useTasksStore } from "../../stores"
import { editDefault } from '../../utils/utils'



export const useEditTask = () => {
   const [task, setTask] = useState(editDefault)
   const tasks = useTasksStore((state) => state.tasks)
   const editId = useEditStore((state) => state.editId)
   

   useEffect(() => {
      if(editId == -1){
         setTask(editDefault)
      }else{
         setTask(tasks.find(task => task.id === editId) as TaskItem)
      }
   },[editId])


   function setName(s: string) {
    setTask({...task, name: s})
   }
   function incTime() {
      if(task.time.total.min < 60){
         setTask({...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}})
      }
   }
   function decTime() {
      if(task.time.total.min > 5){
         setTask({...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 5}}})
      }
   }
   function incCount() {
      if(task.count.total < 20){
         setTask({...task, count: {...task.count, total: task.count.total + 1}})
      }
   }
   function decCount() {
      if(task.count.total > 1){
         setTask({...task, count: {...task.count, total: task.count.total - 1}})
      }
   }

   return {
      task: task,
      setName: setName,
      timeItem: {
         inc: incTime, 
         dec: decTime,
         val: task.time.total.min, 
      },
      countItem: {
         inc: incCount, 
         dec: decCount,
         val: task.count.total
      },
   }
}



