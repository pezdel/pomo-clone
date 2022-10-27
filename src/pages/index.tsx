import type { NextPage } from "next";
import { Navbar, TimerHeader, Timer, TaskList, SettingModal, EditModal, TimerText } from '../components'
import { useMainStore } from '../stores'
import shallow from 'zustand/shallow'

//so plan for today is to finish 
//--refactor timer / the hook we use for that ---still left over
//--start in on setting modal and figure that part out
//--push to vercel


const Home: NextPage = () => {
   const [settingModal, editModal] = useMainStore((state) => [state.settingModal, state.editModal], shallow)
   const theme = useMainStore((state) => state.theme)

   return (
      <div className={theme}>
         <div className="flex flex-col w-screen h-screen bg-primary text-white items-center">
            <div className="flex flex-col w-full h-full items-center">
               <div className="flex pt-3 pb-10">
                  <Navbar />
               </div>
               <div className="flex flex-col w-96 h-72 bg-light rounded-md">
                  <TimerHeader />
                  <Timer />
               </div>
               <div className='w-96'>
                  <TimerText />
                  <TaskList />
               </div>
            </div>
         </div>
         {editModal && <EditModal />}
         {settingModal && <SettingModal/>}
      </div>
   );
};
export default Home;

