import { Button } from "../utils"
import shallow from 'zustand/shallow'
import { useMainStore } from "../../stores"


export const TimerHeader: React.FC = () => {
   const [theme, setTheme] = useMainStore((state) => [state.theme, state.setTheme], shallow)

   return(
      <>
         <div className="flex w-full justify-between px-12 py-3">
            <Button 
               text="Pomodoro"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-red' ? ' bg-dark' : ' '}`} 
               onClick={() => setTheme('theme-red')}
               />
            <Button
               text="Short Break"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-teal' ? ' bg-dark' : ' '}`} 
               onClick={() => setTheme('theme-teal')}
               />
            <Button
               text="Long Break"
               className={`text-sm font-medium px-2.5 py-1 rounded-md ${theme == 'theme-blue' ? ' bg-dark' : ' '}`} 
               onClick={() => setTheme('theme-blue')}
               />
         </div>
      </>
   )
}

