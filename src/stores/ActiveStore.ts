import { useEffect, useState } from 'react';
import create from 'zustand'
import { TaskItem } from '../utils/types';
import { activeDefault, longDefault, shortDefault } from '../utils/utils';
import { useTasksStore } from './TasksStore';
import { useThemeStore } from './ThemeStore';




export interface IActiveStore{
   activeId: number;
   setActiveId: (id: number) => void;
}

export const useActiveStore = create<IActiveStore>()((set) => ({
   activeId: 0,
   setActiveId: (id) => set({activeId: id})
})) 




export const useActiveTask = () => {
   const [task, setTask] = useState(activeDefault)
   const tasks = useTasksStore((state) => state.tasks)
   const id = useActiveStore((state) => state.activeId)
   const theme = useThemeStore((state) => state.theme)

   useEffect(() => {
      if(theme === 'theme-red'){
         setTask(tasks.find(task => task.id === id) as TaskItem)
      }else if(theme === 'theme-teal'){
         setTask(shortDefault)
      }else if(theme === 'theme-blue'){
         setTask(longDefault)
      }
   },[theme, id])

   return task
}
