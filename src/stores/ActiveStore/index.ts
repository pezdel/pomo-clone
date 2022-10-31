import { StateCreator } from 'zustand'
import { useMainStore } from '../MainStore'
import { TaskType } from '..';
import { useTasksStore } from '..'

 
interface ActiveTask {
   id: number;
   min: number;
   sec: number;
   count: number; 
   name: string;
   running?: boolean;
   finished?: boolean;
}

export interface ActiveSlice{
   activeId: number;
   setActiveId: (id: number) => void;
   activeTask: ActiveTask; 
   setActiveTask: (task: ActiveTask) => void;
   setRunning: (r: boolean) => void;
   setFinished: (f: boolean) => void;
   decSec: () => void;
   decMin: () => void;
   updateTime: () => void;
   updateCount: () => void;
}


export const useActiveSlice: StateCreator<TaskType, [
   ["zustand/subscribeWithSelector", never], 
   ["zustand/immer", never], 
   ["zustand/devtools", never]
   ], [], ActiveSlice> 
= (set, get) => ({
   activeId: 0,
   setActiveId: (id) => {
      set({activeId: id})
   },
   activeTask: {min: 30, sec: 0, count: 1, name: "", id: -1, running: false, finished: false},
   setActiveTask: (task) => {
      set({activeTask: {...task, running: false, finished: false}})
   },
   setRunning: (r) => {
      set(state => {
         state.activeTask.running = r
      })
   },
   setFinished: (f) => {
      set(state => {
         state.activeTask.finished = f
      })
   },
   decMin: () => {
      set(state => {
         state.activeTask.sec = 59
         state.activeTask.min -= 1
      })
   },
   decSec: () => {
      set(state => {
         state.activeTask.sec -= 1
      })
   },
   updateTime: () => {
      const activeTask = get().activeTask
      if(activeTask.id != -1){
         set(state => {
            const t = state.tasks.find(task => task.id === state.activeTask.id)
            if(t){
               t.time.current.min = state.activeTask.min
               t.time.current.sec = state.activeTask.sec
            }
         })
      }
   },
   updateCount: () => {
      const activeTask = get().activeTask
      if(activeTask.id != -1){
         set(state => {
            const t = state.tasks.find(task => task.id === state.activeTask.id)
            if(t){
               t.time.current.min = t.time.total.min
               t.time.current.sec = t.time.total.sec
               t.count.current += 1
               
               if(t.count.current == t.count.total){
                  t.complete = true
               }
            }
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


