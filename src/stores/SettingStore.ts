import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, subscribeWithSelector } from 'zustand/middleware'


interface Setting {
   main: number;
   short: number;
   long: number;
}
export interface Item{
   value: number;
   name: string;
   text: string;
}
interface SettingSlice {
   settings: Setting
   setSettings: (s: Setting) => void;
   items: {
      main: Item;
      short: Item;
      long: Item;
   }
   setItems: (s: Setting) => void;
   inc: (name: string) => void;
   dec: (name: string) => void;
}

export const useSettingsStore = create<SettingSlice>()(
   subscribeWithSelector(
      immer(
         devtools(
            (set) => ({
               settings: {main: 30, short: 5, long: 15},
               setSettings: (s) => set({settings: s}),

               items: {
                  main: {value: 30, name: 'main', text: "Main Task"}, 
                  short: {value: 5, name: 'short', text: "Short Break"}, 
                  long: {value: 15, name: 'long', text: "Long Break"},
               },
               setItems: (s) => {
                  set(state => {
                     state.items.main.value = s.main
                     state.items.short.value = s.short
                     state.items.long.value = s.long
                  })
               },
               inc: (name) => {
                  set(state => {
                     if(state.items[name as keyof Setting].value < 60){
                        state.items[name as keyof Setting].value += 1
                     }
                  })
               },
               dec: (name) => {
                  set(state => {
                     if(state.items[name as keyof Setting].value > 1){
                        state.items[name as keyof Setting].value -= 1
                     }
                  })
               }
            }),{name: "Settings"}
         )
      )
   )
)


