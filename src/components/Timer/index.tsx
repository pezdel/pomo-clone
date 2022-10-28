import { Button } from '../utils'
import { useEffect } from 'react'
import { useTimer } from './useTimer'
import { useTasksStore, useMainStore, useActiveStore } from '../../stores'
import shallow from 'zustand/shallow'


//so we are here, inside timer which pulls info from useActiveStore
//when running is stopped we need to update the TasksStore with the new 14:42
//if the timer completes, it turns off and writes updates to the mainstore inside count and time
//so we need two methods attached to the active store, updateTime, updateCount

export const Timer: React.FC = () => {
   const task = useActiveStore((state) => state.task)
   const tt = useTasksStore((state) => state.tasks)
   const { time, startStop, running, finished } = useTimer(task?.time.current)
   const updateTime = useActiveStore((state) => state.updateTime)
   const updateCount = useActiveStore((state) => state.updateCount)

   useEffect(() => {
      console.log(tt)
   },[tt])

   useEffect(() => {
      if(finished){
         updateCount()
         // setTheme('theme-teal')
      }
   },[finished])

   useEffect(() => {
      if(!running){
         updateTime(time)
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
               onClick={startStop}
               className="bg-white text-primary text-2xl h-12 w-40 rounded-md font-semibold"
               />
            }
            {running && <Button 
               text="Stop"
               onClick={startStop}
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

