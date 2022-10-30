import { StateCreator } from 'zustand'
import type { TaskItem } from '../../utils/types'
import { TaskType } from '..'

interface EditObj {
   name: string;
   count: number;
   time: number;
}




   //--setActiveId
   //checks the theme 
      //if theme-red ~ use the activeIdx THIS state.tasks.find(task => task.id === state.activeId) --reun every task or id change
      //if theme-teal ~ use shortDefault
      //if theme-blue ~ use longDefault
   
   //--Methods 
   //start
   //stop
   //next
   //decTime? --first two are effects that actually happen, the bot two are more derived things?
   //submit?

   //--Store
   //activeId 
   //setActiveId 
   //activeTask---subStore
   

   //-----------Edit 
   //--setEditID
   //check id provided 
      //if -1 ~ useTemplate 
      //else ~ use the id to find in TaskList
   
   //--Methods 
   //inc/dec Time 
   //inc/dec Count 
   //submit ---if editId == -1 => add else update 
   //delete ---if editId != -1 && if activeId === editId => change activeId
   
   //--Store? 
   //editId
   //setEditId
   //editTask --subStore

export interface TaskSlice {
   id: number
   tasks: TaskItem[];
   add: (item: EditObj) => void;
   remove: (id: number) => void;
   update: (id: number, item: EditObj) => void;
   toggleComplete: (id: number) => void;
}


export const useTasksSlice: StateCreator<TaskType, [["zustand/immer", never], ["zustand/devtools", never]], [], TaskSlice> = (set) => ({

   id: 0,
   tasks: [],
   add: (item) => {
      set(state => {
         state.tasks.push({
            name: item.name,
            id: state.id,
            time: {current: {min: item.time, sec: 0}, total: {min: item.time, sec: 0}},
            count: {current: 0, total: item.count},
            complete: false,
            fresh: false,
         })
         state.activeId = state.id
         state.id += 1
      })
   },
   remove: (id) => {
      set(state => {
         const idx = state.tasks.findIndex(task => task.id === id)
         state.tasks.splice(idx, 1)
      })
   },
   update: (id, item) => {
      set(state => {
         const task = state.tasks.find(task => task.id === id)
         if(task){
            task.name = item.name
            task.count.total = item.count
            task.time.current.min = item.time
            task.time.total.min = item.time
         }
      })
   },
   toggleComplete: (id) => {
      set(state => {
         const task = state.tasks.find(task => task.id === id)
         if(task){
            task.complete = !task.complete
         }
      })
   }
})



//NON IMMER
// export const useTasksStore = create<TaskStore>()((set, get) => ({
//    tasks: sampleList,
//    remove: (id) => set(state => ({
//       tasks: state.tasks.filter(task => task.id !== id)
//    })),
//    add: (task) => {
//       const id = useMainStore.getState().id
//       set(state => ({
//          tasks: [...state.tasks, {...task, 
//             id: id, 
//             fresh: false, 
//             time: {...task.time, current: {...task.time.total}},
//          }]
//       }))
//       useActiveStore.getState().setId(id)
//       useMainStore.getState().setId()
//    },
//    update: (id, item) => set(state => ({
//       tasks: state.tasks.map(task => task.id === id ? item : task)
//    })),
//    toggleComplete: (id) => set(state => ({
//       tasks: state.tasks.map(task => ({
//          ...task,
//          complete: task.id === id ? !task.complete : task.complete
//       }))
//    })),
// }))






