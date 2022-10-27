import { Button } from "../utils"
import {TaskItem} from '../../utils/types'
import shallow from 'zustand/shallow'
import { useMainStore, useActiveStore, useTasksStore } from "../../stores"
import { longDefault, shortDefault } from "../../utils/utils"


export const TimerHeader: React.FC = () => {
   const [theme, setTheme] = useMainStore((state) => [state.theme, state.setTheme], shallow)
   const [running, setRunning] = useMainStore((state) => [state.running, state.setRunning], shallow)
   const tasks = useTasksStore((state) => state.tasks)
   const activeId = useActiveStore((state) => state.id)
   const setTask = useActiveStore((state) => state.setTask)

   const toggleTheme = (t: string) => {
      if(running){
         setRunning(false)
         alert("timer stopped")
      }
      setTheme(t)
      if(t == 'theme-red'){
         setTask(tasks.find(task => task.id === activeId) as TaskItem)
      }else if(t == 'theme-teal'){
         setTask(shortDefault)
      }else if(t == 'theme-blue'){
         setTask(longDefault)
      }
   }


   return(
      <>
         <div className="flex w-full justify-between px-12 py-3">
            <Button 
               text="Pomodoro"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-red' ? ' bg-dark' : ' '}`} 
               onClick={() => toggleTheme('theme-red')}
               />
            <Button
               text="Short Break"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-teal' ? ' bg-dark' : ' '}`} 
               onClick={() => toggleTheme('theme-teal')}
               />
            <Button
               text="Long Break"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-blue' ? ' bg-dark' : ' '}`} 
               onClick={() => toggleTheme('theme-blue')}
               />
         </div>
      </>
   )
}

