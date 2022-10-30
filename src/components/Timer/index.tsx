import { useState } from 'react'
import { Button } from '../utils'
import { useEffect } from 'react'
import { useTimer } from './useTimer'
import { useTasksStore, useMainStore } from '../../stores'
import { activeDefault, longDefault, shortDefault } from '../../utils/utils'
import { TaskItem } from '../../utils/types'



export const Timer: React.FC = () => {
   const [t, setT] = useState(activeDefault)
   const theme = useMainStore((state) => state.theme)
   const active = useTasksStore((state) => state.tasks[state.tasks.findIndex(task => task.id === state.activeId)] as TaskItem)
   const { time, startStop, running, finished } = useTimer(t.time.current)


   useEffect(() => {
      if(theme == 'theme-red'){
         if(active){
            setT(active)
         }else{
            setT(activeDefault)
         }
      }else if(theme == 'theme-teal'){
         setT(shortDefault)
      }else if(theme == 'theme-blue'){
         setT(longDefault)
      }
   },[theme, active])
   

   useEffect(() => {
      if(finished){
         // updateCount()
         // setTheme('theme-teal')
      }
   },[finished])

   useEffect(() => {
      if(!running){
         // updateTime(time)
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

