import React, { useEffect } from 'react'
import { Button } from '../Button'
import { useTasksStore, useMainStore, useActiveStore } from '../../stores'
import shallow from 'zustand/shallow'


export const Timer: React.FC = () => {
   const { running, start, stop } = useMainStore((state) => ({running: state.running, start: state.start, stop: state.stop}), shallow)
   const { task, decMin, decSec } = useActiveStore()
   const nextTheme = useMainStore((state) => state.nextTheme)
   const saveActive = useTasksStore((state) => state.saveActive)
   const resetTime = useTasksStore((state) => state.resetTime)

   
   useEffect(() => {
      let interval: any
      if(running){
         interval = setInterval(() => {
            if(task.sec === 0 && task.min === 0){
               stop()
               return () => clearInterval(interval)
            }else if(task.sec === 0){
               decMin()
            }else(
               decSec()
            )
         }, 1000)
      }else if(!running && task.min !== 0){
         clearInterval(interval)
      }
      return() => clearInterval(interval)
   },[running, task.sec])


   useEffect(() => {
      if(!running){
         if(task.min == 0 && task.sec == 0){
            saveActive(task.id, {...task, count: task.count + 1})
            resetTime(task.id)
            nextTheme()
         }else{
            saveActive(task.id, task)
         }
      }
   },[running])
   

   return(
      <>
         {task.complete ? <TaskComplete /> : 
         <>
         <div className="text-8xl font-medium flex justify-center h-32 pt-7 ">
            {task.min == 0 ? "00" : 
             task.min < 10 ? "0" + task.min : 
             task.min}
            :
            {task.sec == 0 ? "00" :
             task.sec < 10 ? "0" + task.sec :
             task.sec}
         </div>
         <div className="flex flex-col justify-center items-center h-full pt-2 ">
            {!running && <Button 
               text="Start"
               onClick={start}
               className="bg-white text-primary text-4xl h-16 w-44 rounded-md font-semibold transition ease-in-out delay-150"
               />
            }
            {running && <Button 
               text="Stop"
               onClick={stop}
               className="bg-dark text-white outline outline-2 text-2xl h-16 w-44 rounded-md font-semibold transition ease-in-out delay-150" 
               />
            }
         </div>
         </>
         }
      </>
   )
}

const TaskComplete = () => {

   return(
      <div className="text-5xl font-medium flex items-center justify-center w-128 h-32 pt-10 ">
         Task Complete
      </div>
   )
}
