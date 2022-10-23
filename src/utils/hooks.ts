import { useState, useEffect } from 'react'
import { TaskItem, TimeItem } from './types'
import { activeDefault, shortDefault, longDefault, editDefault } from './utils'
import { useMainStore, useTasksStore, useThemeStore, useTimerStore } from '../stores'
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





export const useActiveTask = () => {
   const theme = useMainStore((state) => state.theme)
   const activeId = useTasksStore((state) => state.activeId)
   const tasks = useTasksStore((state) => state.tasks)
   const [task, setTask] = useState<TaskItem>()

   useEffect(() => {
      if(theme == 'theme-red'){
         if(activeId == -1){
            setTask(activeDefault)
         }else{
            setTask(tasks.filter(task => task.id === activeId)[0])
         }
      }else if(theme == 'theme-teal'){
         setTask(shortDefault)
      }else if(theme == 'theme-blue'){
         setTask(longDefault)
      }
   },[activeId, theme, tasks])

   return task
}


export const useSettingHook = () => {
   const [modal, setModal] = useState(false)

   const handleOpen = () => {
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }
   
   return {settingModal: modal, openSetting: handleOpen, closeSetting: handleClose}
}



export const useEditHook = () => {
   const tasks = useTasksStore((state) => state.tasks)
   const [task, setTask] = useState(editDefault)
   const [modal, setModal] = useState(false)
   const [id, setId] = useState(-1)

   const handleOpen = (id: number) => {
      setModal(true)
      setId(id)
   }

   const handleClose = () => {
      setModal(false)
   }

   useEffect(() => {
      if(id == -1){
         setTask(editDefault)
      }else{
         setTask(tasks.filter(task => task.id === id)[0] as TaskItem) 
      }
   },[id, tasks])


   return {
      editTask: task, 
      editModal: modal, 
      openEdit: handleOpen, 
      closeEdit: handleClose, 
   }
}


export const useActiveHook = () => {
   const tasks = useTasksStore((state) => state.tasks)
   const theme = useThemeStore((state) => state.theme)
   const [task, setTask] = useState(activeDefault)
   const [id, setId] = useState(0)

   const setActiveId = (id: number) => {
      setId(id)
   }

   useEffect(() => {
      if(theme == 'theme-red'){
         id == -1 ? setTask(activeDefault) : setTask(tasks.filter(task => task.id === id)[0] as TaskItem)
      }else if (theme == 'theme-teal'){
         setTask(shortDefault)
      }else if (theme == 'theme-blue'){
         setTask(longDefault)
      }
   },[id, theme])

   useEffect(() => {
      console.log(tasks)
   },[tasks])

   return {activeTask: task, activeId: id, setActiveId: setActiveId}
}

