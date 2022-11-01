import { Button } from '../utils'
import { useEffect } from 'react'
import { useTasksStore, useMainStore } from '../../stores'
import shallow from 'zustand/shallow'


export const Timer: React.FC = () => {
   const task = useTasksStore((state) => state.activeTask)
   const decMin = useTasksStore((state) => state.decMin)
   const decSec = useTasksStore((state) => state.decSec)
   const setTheme = useMainStore((state) => state.setTheme)
   const [running, start, stop] = useTasksStore((state) => [state.running, state.start, state.stop], shallow)
   const incCountActive = useTasksStore((state) => state.incCountActive)
   const saveActive = useTasksStore((state) => state.saveActive)
   const resetTime = useTasksStore((state) => state.resetTime)

   
   useEffect(() => {
      let interval
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
            setTheme('theme-teal')
         }else{
            saveActive(task.id, task)
         }
      }
   },[running])
   

   return(
      <>
         <div className="text-8xl font-medium flex justify-center h-32 pt-3 ">
            {task.min == 0 ? "00" : 
             task.min < 10 ? "0" + task.min : 
             task.min}
            :
            {task.sec == 0 ? "00" :
             task.sec < 10 ? "0" + task.sec :
             task.sec}
         </div>

         <div className="flex flex-col justify-center items-center h-full pt-2">
            {!running && <Button 
               text="Start"
               onClick={start}
               className="bg-white text-primary text-2xl h-12 w-40 rounded-md font-semibold"
               />
            }
            {running && <Button 
               text="Stop"
               onClick={stop}
               className="bg-dark text-white outline outline-2 text-2xl h-12 w-40 rounded-md font-semibold" 
               />
            }
         </div>
      </>
   )
}

