import { useMainStore } from './MainStore'
import { useEditStore } from './EditStore'
import { useSettingsStore } from './SettingStore'
import { useActiveStore } from './ActiveStore'
import { useTasksStore } from './TasksStore'
import { defaultTask } from '../utils/utils'


export {
   useMainStore,
   useEditStore,
   useSettingsStore,
   useActiveStore,
   useTasksStore,
};




export const setActive = () => {
   const id = useMainStore.getState().activeId
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
useTasksStore.subscribe((state) => state.tasks.find(task => task.id === useMainStore.getState().activeId), setActive)
useMainStore.subscribe((state) => state.theme, setActive)




