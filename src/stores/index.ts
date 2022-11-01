import create from 'zustand'
import { useMainStore } from './MainStore'
import { useTasksSlice, TaskSlice } from './TasksStore'
import { useEditSlice, EditSlice } from './EditStore'
import { useActiveSlice, ActiveSlice } from './ActiveStore'
import { useIdSlice, IdSlice } from './IdStore'
import { useRunningSlice, RunningSlice } from './RunningStore'
import { immer } from 'zustand/middleware/immer'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { activeDefault, longDefault, shortDefault } from '../utils/utils'

export {
  useMainStore,
};

export type TaskType = TaskSlice & EditSlice & ActiveSlice & IdSlice & RunningSlice


export const useTasksStore = create<TaskType>()(
   subscribeWithSelector(
      immer(
         devtools(
            (...a) => ({
               ...useTasksSlice(...a),
               ...useEditSlice(...a),
               ...useActiveSlice(...a),
               ...useIdSlice(...a),
               ...useRunningSlice(...a),
            }),{name: "TaskStore"}
         )
      )
   )
)



const setActive = () => {
   const id = useTasksStore.getState().activeId
   const theme = useMainStore.getState().theme
   const tasks = useTasksStore.getState().tasks
   const setActiveTask = useTasksStore.getState().setActiveTask
   
   if(theme === 'theme-red'){
      const task = tasks.find(task => task.id === id)
      if(task){
         setActiveTask({
            min: task.time.current.min, 
            sec: task.time.current.sec, 
            name: task.name, 
            count: task.count.current,
            id: task.id, 
            complete: task.complete,
         })
      }else{
         setActiveTask(activeDefault)
      }
   }else if(theme === 'theme-teal'){
      setActiveTask(shortDefault)
   }else if(theme === 'theme-blue'){
      setActiveTask(longDefault)
   }
}


useTasksStore.subscribe((state) => state.tasks.find(task => task.id === state.activeId), setActive)
useMainStore.subscribe((state) => state.theme, setActive)




