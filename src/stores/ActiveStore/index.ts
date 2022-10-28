import create from 'zustand'
import { TaskItem } from '../../utils/types';
import { activeDefault, longDefault, shortDefault } from '../../utils/utils';
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { getIdx } from '..';
import { useMainStore } from '../MainStore'
import { useTasksStore } from '../TasksStore'


export interface ActiveStore{
   task: TaskItem;
   id: number;
   idx: number;
   setTask: (t: TaskItem) => void;
   setId: (id: number) => void;
}


export const useActiveStore = create<ActiveStore>()(
   immer(
      devtools(
         (set => ({
            task: activeDefault,
            id: 0,
            idx: 0,
            setTask: (t) => {
               set({task: t})
            },
            setId: (id) => {
               const tasks = useTasksStore.getState().tasks
               const idx = getIdx(id)
               set({id: id, idx: idx})
               if(useMainStore.getState().theme === 'theme-red'){
                  set(state => {
                     state.task = tasks[idx] as TaskItem
                  })
               }
            }
         })),{name: 'active'}
      )
   )
)






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


