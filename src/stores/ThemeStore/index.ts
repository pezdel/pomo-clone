import create from 'zustand'


export interface IThemeStore{
   theme: string; 
   setTheme: (t: string) => void;
}

export const useThemeStore = create<IThemeStore>()((set) => ({
   theme: 'theme-red',
   setTheme: (t) => set({theme: t})
})) 

