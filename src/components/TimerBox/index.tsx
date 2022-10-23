import { Button } from "../Button"
import { TimerItem } from './TimerItem'
import shallow from 'zustand/shallow'
import { useThemeStore, useTimerStore } from "../../stores"
import { TaskItem } from "../../utils/types"


const TimerBox: React.FC<{task: TaskItem}> = ({task}) => {
   const [theme, setTheme] = useThemeStore((state) => [state.theme, state.setTheme], shallow)
   const [running, setRunning] = useTimerStore((state) => [state.running, state.setRunning], shallow)

   const toggleTheme = (theme: string) => {
      if(running){
         setRunning(false)
         alert("timer stopped")
      }
      setTheme(theme)
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
         <TimerItem task={task}/>
      </>
   )
}
export default TimerBox

