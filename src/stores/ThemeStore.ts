import create from 'zustand'
import { longDefault, shortDefault } from '../utils/utils';
import { useActiveStore } from './ActiveStore';


export interface IThemeStore{
   theme: string; 
   setTheme: (t: string) => void;
}

export const useThemeStore = create<IThemeStore>()((set) => ({
   theme: 'theme-red',
   setTheme: (t) => set({theme: t})
})) 

