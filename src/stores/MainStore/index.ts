import create from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { useTasksStore } from '..';


export interface MainStore{
   theme: string; 
   setTheme: (t: string) => void;

   editModal: boolean;
   setEditModal: (b: boolean) => void;

   settingModal: boolean;
   setSettingModal: (b: boolean) => void;

   running: boolean;
   setRunning: (b: boolean) => void
}

export const useMainStore = create<MainStore>()(
   devtools(
      subscribeWithSelector(
         (set => ({
            theme: 'theme-red',
            setTheme: (t) => set({theme: t}),

            editModal: false,
            setEditModal: (b) => set({editModal: b}),

            settingModal: false,
            setSettingModal: (b) => set({settingModal: b}),

            running: false,
            setRunning: (b) => set({running: b})         
         }))
      ),{name: "main"}
   )
)

