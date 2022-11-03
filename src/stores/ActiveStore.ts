import create from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { SubTask } from '../utils/types';

 
export interface ActiveSlice{
   task: SubTask; 
   setTask: (task: SubTask) => void;
   decSec: () => void;
   decMin: () => void;
   incCountActive: () => void;
}


export const useActiveStore = create<ActiveSlice>()(
   subscribeWithSelector(
      immer(
         devtools(
            ((set, get) => ({
               task: {min: 30, sec: 0, count: 1, name: "", id: -1, complete: false},
               setTask: (task) => {
                  set({task: task})
               },

               decMin: () => {
                  set(state => {
                     state.task.sec = 59
                     state.task.min -= 1
                  })
               },
               decSec: () => {
                  set(state => {
                     state.task.sec -= 1
                  })
               },
               incCountActive: () => {
                  set(state => {
                     state.task.count += 1
                  })
               }
            })
         )
      )
   )
))






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


