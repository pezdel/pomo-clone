import { Button } from '../Button'
import { useEffect } from 'react'
import { useTimer } from '../../utils/hooks'
import { useTasksStore, useThemeStore } from '../../stores'
import shallow from 'zustand/shallow'
import { TaskItem } from '../../utils/types'


export const Timer: React.FC<{task: TaskItem}> = ({task}) => {
   const [theme, setTheme] = useThemeStore((state) => [state.theme, state.setTheme], shallow)
   const { time, startStop, running, finished } = useTimer(task?.time.current)
   const incCount = useTasksStore((state) => state.taskDone)

   useEffect(() => {
      if(finished){
         if(!task) return
         incCount(task.id)
         setTheme('theme-teal')
      }
   },[finished])

   useEffect(() => {
      if(!running && theme == 'theme-red' && time.min != 0){
         if(!task) return
         incCount(task.id)
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
