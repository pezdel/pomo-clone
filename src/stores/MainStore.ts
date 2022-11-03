import create, {StateCreator} from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'


interface ThemeSlice {
   count: number;
   theme: string;
   setTheme: (t: string) => void;
   nextTheme: () => void;
}
export const useThemeSlice: StateCreator<MainType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], ThemeSlice> 
= (set, get) => ({
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
         set({theme: 'theme-blue', count: 0})
      }else{
         set({theme: 'theme-red'})
      }
   },
})





interface ModalSlice {
   editModal: boolean;
   setEditModal: (b: boolean) => void;
   settingsModal: boolean;
   setSettingsModal: (b: boolean) => void;
}
export const useModalSlice: StateCreator<MainType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], ModalSlice> 
= (set) => ({
   editModal: false,
   setEditModal: (b) => set({editModal: b}),

   settingsModal: false,
   setSettingsModal: (b) => set({settingsModal: b}),
})








interface RunningSlice {
   running: boolean;
   start: () => void;
   stop: () => void;
}
const useRunningSlice: StateCreator<MainType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], RunningSlice> 
= (set) => ({
   running: false,
   start: () => set({running: true}),
   stop: () => set({running: false})
})






interface IdSlice {
   id: number;
   setId: () => void;
   activeId: number;
   setActiveId: (id: number) => void;
}
const useIdSlice: StateCreator<MainType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], IdSlice> 
= (set) => ({
   id: 0,
   setId: () => {
      set(state => {
         state.id += 1
      })
   },
   activeId: 0,
   setActiveId: (id) => set({activeId: id})
})
   






export type MainType = ThemeSlice & ModalSlice & RunningSlice & IdSlice
export const useMainStore = create<MainType>()(
   subscribeWithSelector(
      immer(
         devtools(
            (...a) => ({
               ...useThemeSlice(...a),
               ...useModalSlice(...a),
               ...useRunningSlice(...a),
               ...useIdSlice(...a),
            }),{name: "Main"}
         )
      )
   )
)






