import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { TimerItem } from '../components/TimerBox/TimerItem'
import { TaskListItem } from '../components/TaskList/TaskListItem'
import { Button } from '../components/Button'
import { AddSvg } from '../utils/svg'
import { SettingModal, EditModal } from '../components/Modal'
import { useEditHook, useSettingHook, useActiveHook } from '../utils/hooks'
import { useTasksStore, useThemeStore, useTimerStore } from '../stores'
import shallow from 'zustand/shallow'





const Home: NextPage = () => {
   const tasks = useTasksStore((state) => state.tasks)
   const [theme, setTheme] = useThemeStore((state) => [state.theme, state.setTheme], shallow)
   const {settingModal, openSetting, closeSetting} = useSettingHook()
   const {editModal, openEdit, closeEdit, editTask} = useEditHook()
   const {activeTask, activeId, setActiveId}= useActiveHook()
   const [running, setRunning] = useTimerStore((state) => [state.running, state.setRunning], shallow)

   const toggleTheme = (theme: string) => {
      if(running){
         setRunning(false)
         alert("timer stopped")
      }
      setTheme(theme)
   }

   return (
      <div className={theme}>
         <div className="flex flex-col w-screen h-screen bg-primary text-white items-center">
            <div className="flex flex-col w-full h-full items-center">
               <div className="flex pt-3 pb-10">
                  <Navbar openSetting={openSetting}/>
               </div>

               {/* TimerBox */}
               <div className="flex flex-col w-96 h-72 bg-light rounded-md">
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
                  <TimerItem task={activeTask}/>
               </div>

               {/* TasksList */}
               <div className="w-96">
                  <Button 
                     text="AddTask"
                     className="flex items-center justify-center w-full h-14 bg-dark border border-dashed rounded-md text-gray-200 font-normal"
                     onClick={() => openEdit(-1)} 
                     svg={<AddSvg />} 
                     />
                  <div className="h-60 overflow-auto mt-1">
                     {tasks.map((item, i) => 
                        <TaskListItem 
                           key={i} 
                           item={item} 
                           openEdit={openEdit} 
                           activeId={activeId} 
                           setActiveId={setActiveId}/>
                     )}
                  </div>
               </div>
            </div>
         </div>
         {editModal && <EditModal task={editTask} close={closeEdit}/>}
         {settingModal && <SettingModal close={closeSetting}/>}
      </div>
   );
};
export default Home;





{/* <TimerBox task={activeTask} /> */}
{/* <TaskList openEdit={openEdit} activeId={activeId} setActiveId={setActiveId} /> */}
