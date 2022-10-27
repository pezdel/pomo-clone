import create from 'zustand'


export interface IMainStore{
   id: number;
   setId: () => void;

   theme: string; 
   setTheme: (t: string) => void;

   editModal: boolean;
   setEditModal: (b: boolean) => void;

   settingModal: boolean;
   setSettingModal: (b: boolean) => void;

   running: boolean;
   setRunning: (b: boolean) => void
}

export const useMainStore = create<IMainStore>()((set) => ({
   id: 0,
   setId: () => set(state => ({id: state.id + 1})),

   theme: 'theme-red',
   setTheme: (t) => set({theme: t}),

   editModal: false,
   setEditModal: (b) => set({editModal: b}),

   settingModal: false,
   setSettingModal: (b) => set({settingModal: b}),

   running: false,
   setRunning: (b) => set({running: b})
})) 

