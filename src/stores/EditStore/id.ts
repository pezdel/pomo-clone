import { StateCreator } from 'zustand'
import { StoreType } from '.';
import { editDefault } from '../../utils/utils';
import { useTasksStore } from '../TasksStore';


export interface IdStore{
   editId: number; 
   setEditId: (id: number) => void;
}

export const useIdStore: StateCreator<StoreType, [], [], IdStore>  = (set) => ({
  editId: 0,
  setEditId: (id) => {
    const task = useTasksStore.getState().tasks
    if(id == -1){
      set({task: editDefault})
    }else{
      set({task: task.find(task => task.id === id)})
    }
  }
})
 
