import { useState, useEffect } from 'react'
import { TaskItem } from '../../utils/types';
import { activeDefault, longDefault, shortDefault } from '../../utils/utils';
import { useTasksStore, useThemeStore, useActiveStore } from '../../stores'



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
