import { StateCreator } from 'zustand'
import { StoreType } from '.';
import { IncDec, TaskItem } from '../../utils/types';
import { editDefault } from '../../utils/utils';
import { useTasksStore } from '../TasksStore';


export interface TaskStore{
   task: TaskItem; 
   setTask: () => void;
   setName: (n: string) => void;
   incTime: () => void;
   decTime: () => void;
   incCount: () => void;
   decCount: () => void;
   submit: (close: () => void) => void;
}


export const useTaskStore: StateCreator<StoreType, [], [], TaskStore> = (set, get) => ({
  task: editDefault,
  setTask: () =>  {return},
  setName: (n) => {
    set(state => ({task: {...state.task, name: n}}))
  },
  incTime: () => {
    const task = get().task
    if(task.time.total.min < 60){
      set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}}})
    }
  },
  decTime: () => {
    const task = get().task
    if(task.time.total.min > 5){
      set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 5}}}})
    }
  },
  incCount: () => {
    const task = get().task
    if(task.count.total < 20){
      set({task: {...task, count: {...task.count, total: task.count.total + 1}}})
    }
  },
  decCount: () => {
    const task = get().task
    if(task.count.total > 1){
      set({task: {...task, count: {...task.count, total: task.count.total - 1}}})
    }
  },
  submit: (close) => {
    const task = get().task
    if(task.fresh){
        useTasksStore.getState().add(task)
      }else{
        useTasksStore.getState().update(task.id, task)
    }
    close()
  },
})
 
