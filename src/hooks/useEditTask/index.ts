import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import type { TaskItem } from '../../utils/types'
import { useEditStore, useTasksStore } from "../../stores"
import { editDefault } from '../../utils/utils'
import shallow from 'zustand/shallow'


type setState = Dispatch<SetStateAction<TaskItem>>

export const useEditTask = (close: () => void) => {
   // const [task, setTask] = useState(editDefault)
   const editTask = useEditMethods()
   const tasks = useTasksStore((state) => state.tasks)
   const editId = useEditStore((state) => state.editId)
   

   useEffect(() => {
      if(editId == -1){
         editTask.set(editDefault)
      }else{
         editTask.set(tasks.find(task => task.id === editId) as TaskItem)
      }
   },[editId])
   


   return {
      task: editTask.get,
      setName: editTask.setName,
      timeItem: {
         inc: editTask.incTime, 
         dec: editTask.decTime,
         val: editTask.task.time.total.min, 
      },
      countItem: {
         inc: editTask.incCount, 
         dec: editTask.decCount,
         val: editTask.task.count.total
      },
      submit: editTask.submit
   }
}




export const useEditMethods = () => {
   const [task, setTask] = useState(editDefault)
   const { addTask, updateTask } = useTasksStore((state) => ({addTask: state.add, updateTask: state.update}), shallow)

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
   function submit() {
      if(task.fresh){
         addTask(task)
      }else{
         updateTask(task.id, task)
      }
      close()
   }
}