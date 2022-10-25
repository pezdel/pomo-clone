import create from 'zustand'
import { TaskItem } from '../../utils/types';
import { editDefault } from '../../utils/utils';


export interface IEditStore{
   editTask: TaskItem; 
   setEditTask: (t: TaskItem) => void;
}

export const useEditStore = create<IEditStore>()((set) => ({
   editTask: editDefault,
   setEditTask: (t) => set({editTask: t}),
})) 

