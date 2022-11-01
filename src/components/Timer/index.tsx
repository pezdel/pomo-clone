import { Button } from '../utils'
import { useEffect } from 'react'
import { useTasksStore, useMainStore } from '../../stores'
import { TaskItem } from '../../utils/types'
import shallow from 'zustand/shallow'


export const Timer: React.FC = () => {
   const time = useTasksStore((state) => state.activeTask)
   const theme = useMainStore((state) => state.theme)
   const active = useTasksStore((state) => state.tasks[state.tasks.findIndex(task => task.id === state.activeId)] as TaskItem)
   // const { time, startStop, running, finished } = useTimer({min: task.min, sec: 0})
   const decMin = useTasksStore((state) => state.decMin)
   const decSec = useTasksStore((state) => state.decSec)
   const updateTime = useTasksStore((state) => state.updateTime)
   const updateCount = useTasksStore((state) => state.updateCount)
   const setTheme = useMainStore((state) => state.setTheme)
   const [running, setRunning] = useTasksStore((state) => [state.running, state.setRunning], shallow)
   const [finished, setFinished] = useTasksStore((state) => [state.finished, state.setFinished], shallow)

   


   useEffect(() => {
      let interval
      if(running){
         interval = setInterval(() => {
            if(time.sec === 0 && time.min === 0){
               setRunning(false)
               setFinished(true)
               return () => clearInterval(interval)
            }else if(time.sec === 0){
               decMin()
            }else(
               decSec()
            )
         }, 1000)
      }else if(!running && time.min !== 0){
         clearInterval(interval)
      }
      return() => clearInterval(interval)
   },[running, time.sec])

   useEffect(() => {
      if(finished){
         updateCount()
         if(theme == 'theme-red'){
            //logic to handle the every other break or something?
            setTheme('theme-teal')
         }else{
            setTheme('theme-red')
         }
      }
   },[finished])

   useEffect(() => {
      if(!running){
         updateTime()
      }
   },[running])
   

   return(
      <>
         <div className="text-8xl font-medium flex justify-center h-32 pt-3 ">
            {time.min == 0 ? "00" : 
             time.min < 10 ? "0" + time.min : 
             time.min}
            :
            {time.sec == 0 ? "00" :
             time.sec < 10 ? "0" + time.sec :
             time.sec}
         </div>

         <div className="flex flex-col justify-center items-center h-full pt-2">
            {!running && <Button 
               text="Start"
               onClick={() => setRunning(true)}
               className="bg-white text-primary text-2xl h-12 w-40 rounded-md font-semibold"
               />
            }
            {running && <Button 
               text="Stop"
               onClick={() => setRunning(false)}
               className="bg-dark text-white outline outline-2 text-2xl h-12 w-40 rounded-md font-semibold" 
               />
            }
         </div>
      </>
   )
}





//updates for mainTaskStore
//updateTime ---sent after stopButton to mainTaskStore
//updateCount ---sent after time hits 00 to mainTaskStore

//forTimer
//decSec---used inside timer for ticking second (idk where this will update, either local state, or zustand store state?)
//decMin--maybe

//running
//finished
//toggleOnOff

