import type { NextPage } from "next";
import { Navbar, TimerHeader, Timer, TaskList, SettingModal, EditModal, TimerText } from '../components'
import { useEditModal, useSettingModal } from "../hooks";
import { useThemeStore } from '../stores'

//so plan for today is to finish 
//--refactor timer / the hook we use for that ---still left over
//--start in on setting modal and figure that part out
//--push to vercel

const Home: NextPage = () => {
   const theme = useThemeStore((state) => state.theme)
   const { settingModal, openSetting, closeSetting } = useSettingModal()
   const { openEdit, closeEdit, editModal } = useEditModal()

   return (
      <div className={theme}>
         <div className="flex flex-col w-screen h-screen bg-primary text-white items-center">
            <div className="flex flex-col w-full h-full items-center">
               <div className="flex pt-3 pb-10">
                  <Navbar openSetting={openSetting} />
               </div>
               <div className="flex flex-col w-96 h-72 bg-light rounded-md">
                  <TimerHeader />
                  <Timer />
               </div>
               <div className='w-96'>
                  <TimerText />
                  <TaskList openEdit={openEdit} />
               </div>
            </div>
         </div>
         {editModal && <EditModal close={closeEdit} />}
         {settingModal && <SettingModal close={closeSetting}/>}
      </div>
   );
};
export default Home;

