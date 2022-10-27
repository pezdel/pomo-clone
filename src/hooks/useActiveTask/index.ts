import { useState, useEffect } from 'react'
import { TaskItem } from '../../utils/types';
import { activeDefault, longDefault, shortDefault } from '../../utils/utils';
import { useTasksStore, useMainStore, useActiveStore } from '../../stores'



export const useActiveTask = () => {
   const [task, setTask] = useState(activeDefault)
   const tasks = useTasksStore((state) => state.tasks)
   const id = useActiveStore((state) => state.activeId)
   const theme = useMainStore((state) => state.theme)

   useEffect(() => {
      if(theme === 'theme-red'){
         console.log(id)
         setTask(tasks.find(task => task.id === id) as TaskItem)
      }else if(theme === 'theme-teal'){
         setTask(shortDefault)
      }else if(theme === 'theme-blue'){
         setTask(longDefault)
      }
   },[theme, id])

   return task
}
