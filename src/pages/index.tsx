import type { NextPage } from "next";
import { Navbar, TimerHeader, Timer, TaskList, SettingModal, EditModal, TimerText } from '../components'
import { useMainStore } from '../stores'
import shallow from 'zustand/shallow'


const Home: NextPage = () => {
   const [settingsModal, editModal] = useMainStore((state) => [state.settingsModal, state.editModal], shallow)
   const theme = useMainStore((state) => state.theme)

   return (
      <div className={theme}>
         <div className="flex flex-col w-screen h-screen bg-primary text-white items-center transition ease-in-out delay-150">
            <div className="flex flex-col w-full h-full items-center ">
               <div className="flex pt-3 pb-10">
                  <Navbar />
               </div>
               <div className="flex flex-col w-128 h-80 bg-light rounded-md transition ease-in-out delay-150">
                  <TimerHeader />
                  <Timer />
               </div>
               <div className='w-128 transition ease-in-out delay-150'>
                  <TimerText />
               </div>
               <div className='bg-primary w-screen flex justify-center transition ease-in-out delay-150'>
                  <TaskList />
               </div>
            </div>
         </div>
         {editModal && <EditModal />}
         {settingsModal && <SettingModal/>}
      </div>
   );
};
export default Home;

