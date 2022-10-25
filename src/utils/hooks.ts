import { useState, useEffect, Dispatch, SetStateAction, useLayoutEffect } from 'react'
import { TaskItem, TimeItem } from './types'
import { activeDefault, shortDefault, longDefault } from './utils'
import { useEditStore, useTasksStore, useThemeStore, useTimerStore } from '../stores'
import shallow from 'zustand/shallow'


export const useTimer = (startTime: TimeItem | undefined) => {
   const [running, setRunning] = useTimerStore((state) => [state.running, state.setRunning], shallow)
   const [finished, setFinished] = useState(false) 
   const [min, setMin] = useState(0)
   const [sec, setSec] = useState(0)

   useEffect(() => {
      if(!startTime) return
      setMin(startTime.min)
      setSec(startTime.sec)
   },[startTime])


   useEffect(() => {
      let interval
      if(running){
         interval = setInterval(() => {
            if(sec === 0 && min === 0){
               setRunning(false)
               setFinished(true)
               return () => clearInterval(interval)
            }else if(sec === 0){
               setSec(59)
               setMin(prev => prev - 1)
            }else(
               setSec(prev => prev - 1)
            )
         }, 1000)
      }else if(!running && min !== 0){
         clearInterval(interval)
      }
      return() => clearInterval(interval)
   },[running, sec])


   function toggle(){
      if(!running && finished){
         setFinished(false)
      }
      setRunning(!running)
   } 

   return {time: {min: min, sec: sec}, startStop: toggle, running: running, finished: finished}
}






export const useSettingModal = () => {
   const [modal, setModal] = useState(false)

   const handleOpen = () => {
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }
   
   return {settingModal: modal, openSetting: handleOpen, closeSetting: handleClose}
}





export const useEditModal = () => {
   const [editTask, setEditTask] = useEditStore((state) => [state.editTask, state.setEditTask], shallow)
   const [modal, setModal] = useState(false)

   const handleOpen = (t: TaskItem) => {
      setEditTask(t)
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }

   return {
      editTask: editTask,
      editModal: modal, 
      openEdit: handleOpen, 
      closeEdit: handleClose,
   }
}






export const useActiveTask = (): [TaskItem, (id: number) => void] => {
   const tasks = useTasksStore((state) => state.tasks)
   const [_task, _setTask] = useState(activeDefault)
   const [task, setTask] = useState(activeDefault)
   const theme = useThemeStore((state) => state.theme)
   const [activeId, _setActiveId] = useState(0)

   const setActiveId = (id: number) => {
      _setActiveId(id)
   }
   useEffect(() => {
      console.log(tasks)
      const t = tasks.filter(task => task.id === activeId)[0]
      if(t != undefined){
         _setTask(t)
         if(theme == 'theme-red'){
            setTask(t)
         }
      }
   },[activeId, tasks])



   useEffect(() => {
      if(theme == 'theme-red'){
         setTask(_task)
      }else if(theme == 'theme-teal'){
         setTask(shortDefault)
      }else if(theme == 'theme-blue'){
         setTask(longDefault)
      }
   },[theme])


   return [task, setActiveId]
}

