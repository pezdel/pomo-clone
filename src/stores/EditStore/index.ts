import { useIdStore, IdStore } from "./editId";
import { useTaskStore, TaskStore } from './editTask'
import create from 'zustand'

export type StoreType = IdStore & TaskStore

export const useEditStore = create<StoreType>()((...a) => ({
   ...useIdStore(...a),
   ...useTaskStore(...a)
}))
