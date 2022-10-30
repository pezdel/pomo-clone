import { StateCreator } from 'zustand'
import { TaskItem } from '../../utils/types';
import { useMainStore } from '../MainStore'
import { TaskType } from '..';


export interface EditSlice{
   editTask: {time: number, count: number, name: string}
   editId: number;
   setEditTask: (id: number) => void
   setName: (n: string) => void;
   incCount: () => void;
   decCount: () => void;
   incTime: () => void;
   decTime: () => void;
}


export const useEditSlice: StateCreator<TaskType, [["zustand/immer", never], ["zustand/devtools", never]], [], EditSlice> = (set) => ({
   editTask: {time: 1, count: 2, name: "edit"},
   editId: 0,
   setEditTask: (id) => {
      set(state => {
         if(id == -1){
            state.editTask = {time: 30, count: 1, name: "placeholder"}
         }else{
            const item = state.tasks.find(task => task.id === id) as TaskItem
            state.editTask = {
               time: item.time.total.min,
               count: item.count.total,
               name: item.name,
            }
         }
         state.editId = id
         useMainStore.setState({editModal: true})
      })
   },
   setName: (n) => {
      set(state => {
         state.editTask.name = n
      })
   },
   incTime: () => {
      set(state => {
         if(state.editTask.time < 60){
            state.editTask.time += 5
         }
      })
   },
   decTime: () => {
      set(state => {
         if(state.editTask.time > 5){
            state.editTask.time -= 5
         }
      })
   },
   incCount: () => {
      set(state => {
         if(state.editTask.count < 20){
            state.editTask.count += 1
         }
      })
   },
   decCount: () => {
      set(state => {
         if(state.editTask.count > 0){
            state.editTask.count -= 1
         }
      })
   }
})




//NON-IMMER
// export const _useEditStore = create<IEditStore>()((set, get) => ({
//    task: editDefault,
//    setTask: (id) => {
//       const task = useTasksStore.getState().tasks
//       if(id == -1){
//          set({task: editDefault})
//       }else{
//          set({task: task.find(task => task.id === id)})
//       }
//    },
//    setName: (n) => {
//       set(state => ({task: {...state.task, name: n}}))
//    },
//    incTime: () => {
//       const task = get().task
//       if(task.time.total.min < 60){
//          set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}}})
//       }
//    },
//    decTime: () => {
//       const task = get().task
//       if(task.time.total.min > 1){
//          set({task: {...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 1}}}})
//       }
//    },
//    incCount: () => {
//       const task = get().task
//       if(task.count.total < 20){
//          set({task: {...task, count: {...task.count, total: task.count.total + 1}}})
//       }
//    },
//    decCount: () => {
//       const task = get().task
//       if(task.count.total > 1){
//          set({task: {...task, count: {...task.count, total: task.count.total - 1}}})
//       }
//    },
//    submit: (close) => {
//       const task = get().task
//       if(task.fresh){
//          useTasksStore.getState().add(task)
//       }else{
//          useTasksStore.getState().update(task.id, task)
//       }
//       close()
//    },
// })) 




// export const useCountItem = () => {
//    const { task, incCount, decCount } = useEditStore()

//    return{
//       inc: incCount,
//       dec: decCount,
//       val: task.count.total
//    }
// }

// export const useTimeItem = () => {
//    const { task, incTime, decTime } = useEditStore()

//    return{
//       inc: incTime,
//       dec: decTime,
//       val: task.time.total.min
//    }
// }







