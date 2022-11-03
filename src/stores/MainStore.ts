import create from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'


export interface MainStore{
   count: number;
   theme: string; 
   setTheme: (t: string) => void;
   nextTheme: () => void;

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
         ((set, get) => ({
            count: 0,
            theme: 'theme-red',
            setTheme: (t) => set({theme: t}),
            nextTheme: () => {
               const theme = get().theme
               const count = get().count
               if(theme === 'theme-red' && count <= 2){
                  set(state => ({
                     theme: 'theme-teal',
                     count: state.count + 1, 
                  }))
               }else if(theme === 'theme-red' && count === 3){
                  set(state => ({
                     theme: 'theme-blue',
                     count: 0,
                  }))
               }else{
                  set({theme: 'theme-red'})
               }
            },

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

