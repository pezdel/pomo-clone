import create from 'zustand'
import { TaskItem } from '../utils/types';
import { activeDefault, longDefault, shortDefault } from '../utils/utils';
import { useThemeStore } from './ThemeStore';



//so for active...we need to loop through an dtoglge all off/one one based off id functi
//so () => {maps=>task => task.id === id ? true : false}

//so when we click on the list item we should have 



export interface IActiveStore{
   activeDefault: TaskItem;
   activeId: number;
   setActiveId: (t: number) => void;
}

export const useActiveStore = create<IActiveStore>()((set) => ({
   activeTask: activeDefault,
   activeId: 0,
   setActiveId: (t) => set({}),
})) 

