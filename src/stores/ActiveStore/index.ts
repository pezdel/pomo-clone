import { StateCreator } from 'zustand'
import { useMainStore } from '../MainStore'
import { TaskType } from '..';


export interface ActiveSlice{
   activeTask: {time: number, count: number, name: string}
   activeId: number;
   setActiveId: (id: number) => void;
   setActiveTask: () => void;
}


export const useActiveSlice: StateCreator<TaskType, [["zustand/immer", never], ["zustand/devtools", never]], [], ActiveSlice> = (set, get) => ({
   activeTask: {time: 1, count: 2, name: "active"},
   activeId: 0,
   setActiveId: (id) => {
      set({activeId: id})
      get().setActiveTask()
   },
   setActiveTask: () => {
      const theme = useMainStore.getState().theme
      const id = get().activeId
      if(theme === 'theme-red'){
         set(state => {
            const task = state.tasks.find(task => task.id == id)
            if(task){
               state.activeTask = {time: task.time.current.min, count: task.count.current, name: task.name}
            }
         })
      }else if(theme === 'theme-teal'){
         set(state => {
            state.activeTask = {time: 5, count: 1, name: "ShortBreak"}
         })
      }else if (theme === 'theme-blue'){
         set(state => {
            state.activeTask = {time: 15, count: 1, name: "LongBreak"}
         })
      }
   }
})








//Non-Immer
// export const useActiveStore = create<IActiveStore>()((set, get) => ({
//    task: activeDefault,
//    id: 0,
//    idx: 0,
//    setTask: (t) => set({task: t}),
//    setId: (id) => {
//       const tasks = useTasksStore.getState().tasks
//       const _idx = tasks.findIndex(task => task.id === id)
//       set({id: id, idx: _idx})
//
//       if(useMainStore.getState().theme === 'theme-red'){
//          set({task: tasks[_idx]})
//       }
//    },
//    updateTime: (t) => {
//       if(useMainStore.getState().theme == 'theme-red'){
//          const update = useTasksStore.getState().update
//          const id = get().id
//          const task = get().task
//          update(id, {...task, time: {...task.time, current: t}})
//       }
//    },
//    updateCount: () => {
//       if(useMainStore.getState().theme == 'theme-red'){
//          const update = useTasksStore.getState().update
//          const toggle = useTasksStore.getState().toggleComplete
//          const id = get().id
//          const task = get().task
//          update(id, {...task, count: {...task.count, current: task.count.current + 1}, time: {...task.time, current: {...task.time.total}}})
//          if(task.count.current + 1 == task.count.total){
//             toggle(id)
//          }
//       }
//    }
//
// })) 


