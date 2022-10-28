import create from 'zustand'
import { TaskItem } from '../../utils/types';
import { activeDefault, longDefault, shortDefault } from '../../utils/utils';
import { useMainStore } from '../MainStore';
import { useTasksStore } from '../TasksStore';


export interface IActiveStore{
   task: TaskItem;
   id: number;
   idx: number;
   setTask: (t: TaskItem) => void;
   setId: (id: number) => void;
   updateTime: (t: {min: number, sec: number}) => void;
   updateCount: () => void;
}


export const useActiveStore = create<IActiveStore>()((set, get) => ({
   task: activeDefault,
   id: 0,
   idx: 0,
   setTask: (t) => set({task: t}),
   setId: (id) => {
      const tasks = useTasksStore.getState().tasks
      const _idx = tasks.findIndex(task => task.id === id)
      set({id: id, idx: _idx})

      if(useMainStore.getState().theme === 'theme-red'){
         set({task: tasks[_idx]})
      }
   },
   updateTime: (t) => {
      if(useMainStore.getState().theme == 'theme-red'){
         const update = useTasksStore.getState().update
         const id = get().id
         const task = get().task
         update(id, {...task, time: {...task.time, current: t}})
      }
   },
   updateCount: () => {
      if(useMainStore.getState().theme == 'theme-red'){
         const update = useTasksStore.getState().update
         const toggle = useTasksStore.getState().toggleComplete
         const id = get().id
         const task = get().task
         update(id, {...task, count: {...task.count, current: task.count.current + 1}, time: {...task.time, current: {...task.time.total}}})
         if(task.count.current + 1 == task.count.total){
            toggle(id)
         }
      }
   }

})) 


