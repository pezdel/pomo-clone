import create from 'zustand'
import { TaskItem } from '../../utils/types';
import { activeDefault, longDefault, shortDefault } from '../../utils/utils';
import { useMainStore } from '../MainStore';
import { useTasksStore } from '../TasksStore';


export interface IActiveStore{
   task: TaskItem;
   setTask: (t: TaskItem) => void;
   id: number;
   setId: (i: number) => void;
   idx: number;
   setIdx: (i: number) => void;
}


export const useActiveStore = create<IActiveStore>()((set) => ({
   task: activeDefault,
   setTask: (t) => set({task: t}),
   id: 0,
   setId: (i) => set({id: i}),
   idx: 0,
   setIdx: (i) => set({idx: i}),
})) 


