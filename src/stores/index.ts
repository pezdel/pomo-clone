import create from 'zustand'
import { useMainStore } from './MainStore'
import { useEditStore } from './EditStore'
import { useSettingsStore } from './SettingStore'
import { useRunningStore } from './RunningStore'
import { useActiveStore } from './ActiveStore'
import { useTasksSlice, TaskSlice } from './TasksStore'
import { useIdSlice, IdSlice } from './IdStore'
import { defaultTask } from '../utils/utils'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export {
   useMainStore,
   useEditStore,
   useSettingsStore,
   useRunningStore,
   useActiveStore
};

export type TaskType = TaskSlice & IdSlice 
export const useTasksStore = create<TaskType>()(
   subscribeWithSelector(
      immer(
         devtools(
            (...a) => ({
               ...useTasksSlice(...a),
               ...useIdSlice(...a),
            }),{name: "TaskStore"}
         )
      )
   )
)



export const setActive = () => {
   const id = useTasksStore.getState().activeId
   const theme = useMainStore.getState().theme
   const tasks = useTasksStore.getState().tasks
   const setActiveTask = useActiveStore.getState().setTask
   const settings = useSettingsStore.getState().settings
   
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
         setActiveTask({...defaultTask, min: settings.main, name: ""})
      }
   }else if(theme === 'theme-teal'){
      setActiveTask({...defaultTask, min: settings.short, name: "Short Break"})
   }else if(theme === 'theme-blue'){
      setActiveTask({...defaultTask, min: settings.long, name: "Long Break"})
   }
}


useSettingsStore.subscribe((state) => state.settings, setActive)
useTasksStore.subscribe((state) => state.tasks.find(task => task.id === state.activeId), setActive)
useMainStore.subscribe((state) => state.theme, setActive)




