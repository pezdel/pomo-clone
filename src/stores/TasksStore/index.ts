import create from 'zustand'
import type { TaskItem } from '../../utils/types'
import { sampleList } from '../../utils/utils'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import { getIdx } from '..'


interface TaskStore {
   tasks: TaskItem[]
   id: number
   remove: (id: number) => void;
   add: (task: TaskItem) => void;
   update: (id: number, item: TaskItem) => void;
   toggleComplete: (id: number) => void;
}


export const useTasksStore = create<TaskStore>()(
   immer(
      devtools(
         persist(
            (set => ({
               tasks: sampleList,
               id: 0,
               remove: (id) => {
                  const idx = getIdx(id)
                  set(state => {
                     state.tasks.splice(idx, 1)
                  })
               },
               add: (task) => {
                  set(state => {
                     task.time.current = task.time.total
                     state.tasks.push({...task, id: state.id, fresh: false})
                     state.id += 1
                  })
               },
               update: (id, item) => {
                  const idx = getIdx(id)
                  set(state => {
                     state.tasks[idx] = item
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
            }))
         )
      )
   )
)











// export const useTasksStore = create(devtools(immer<State & Actions>((set) => ({
// const useTasks = (set) => ({
//    tasks: sampleList,
//    id: 0,
//    remove: (id) => {
//       const idx = getIdx(id)
//       set(state => {
//          state.tasks.splice(idx, 1)
//       })
//    },
//    add: (task) => {
//       set(state => {
//          task.time.current = task.time.total
//          state.tasks.push({...task, id: state.id, fresh: false})
//          state.id += 1
//       })
//    },
//    update: (id, item) => {
//       const idx = getIdx(id)
//       set(state => {
//          state.tasks[idx] = item
//       })
//    },
//    toggleComplete: (id) => {
//       set(state => {
//          const task = state.tasks.find(task => task.id === id)
//          if(task){
//             task.complete = !task.complete
//          }
//       })
//    }
// })
// }))))













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
//    taskDone: (id) => set(state => ({
//       tasks: state.tasks.map(task => ({
//          ...task,
//          count: {...task.count, current: task.id === id ? task.count.current + 1 : task.count.current}
//       }))
//    })),
// }))
