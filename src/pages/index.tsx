import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import TimerBox from "../components/TimerBox";
import TaskList from "../components/TaskList";
import { SettingModal, EditModal } from '../Modal'
import { useEditHook, useSettingHook, useActiveHook } from '../utils/hooks'
import { useThemeStore } from '../stores'



const Home: NextPage = () => {
   const theme = useThemeStore((state) => state.theme)
   const { settingModal, openSetting, closeSetting } = useSettingHook()
   const { editModal, openEdit, closeEdit, editTask } = useEditHook()
   const activeTask = useActiveHook()


   return (
      <div className={theme}>
         <div className="flex flex-col w-screen h-screen bg-primary text-white items-center">
            <div className="flex flex-col w-full h-full items-center">
               <div className="flex pt-3 pb-10">
                  <Navbar openSetting={openSetting}/>
               </div>
               <div className="flex flex-col w-96 h-72 bg-light rounded-md">
                  <TimerBox task={activeTask} />
               </div>
               <div className='w-96'>
                  <TaskList openEdit={openEdit} />
               </div>
            </div>
         </div>
         {editModal && <EditModal task={editTask} close={closeEdit} />}
         {settingModal && <SettingModal close={closeSetting}/>}
      </div>
   );
};
export default Home;





