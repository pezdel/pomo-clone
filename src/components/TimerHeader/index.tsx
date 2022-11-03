import { Button } from "../Button"
import shallow from 'zustand/shallow'
import { useMainStore } from "../../stores"


export const TimerHeader: React.FC = () => {
   const [theme, setTheme] = useMainStore((state) => [state.theme, state.setTheme], shallow)

   return(
      <>
         <div className="flex w-full justify-between px-8 py-3 ">
            <Button 
               text="Pomodoro"
               className={`text-md font-medium px-2.5 py-2 rounded-md transition ease-in-out delay-150 ${theme == 'theme-red' ? ' bg-dark ' : ' '}`} 
               onClick={() => setTheme('theme-red')}
               />
            <Button
               text="Short Break"
               className={`text-md font-medium px-2.5 py-2 rounded-md transition ease-in-out delay-150 ${theme == 'theme-teal' ? ' bg-dark' : ' '}`} 
               onClick={() => setTheme('theme-teal')}
               />
            <Button
               text="Long Break"
               className={`text-md font-medium px-2.5 py-2 rounded-md transition ease-in-out delay-150 ${theme == 'theme-blue' ? ' bg-dark' : ' '}`} 
               onClick={() => setTheme('theme-blue')}
               />
         </div>
      </>
   )
}

