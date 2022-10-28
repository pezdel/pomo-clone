import { proxy } from 'valtio'
import { TaskItem } from '../utils/types'
import { activeDefault, editDefault } from '../utils/utils';

type TaskStore = {
   tasks: TaskItem[];
   id: number;
   remove: (id: number) => void;
   add: (task: TaskItem) => void;
   update: (id: number, item: TaskItem) => void;
   toggleComplete: (id: number) => void;
}
export const store = proxy<TaskStore>({
   tasks: [],
   id: 0,
   remove: (id) => {
      store.tasks = store.tasks.filter((task) => task.id !== id)
   },
   add: (task) => {
      store.tasks.push({...task, id: store.id, fresh: false, time: {...task.time, current: {...task.time.total}}})
      active.id = store.id
      store.id += 1
   },
   update: (id, item) => {
      const idx = store.tasks.findIndex(task => task.id === id)
      store.tasks[idx] = item
   },
   toggleComplete: (id) => {
      const task = store.tasks.find(task => task.id === id)
      if(task){
         task.complete = !task.complete
      }
   },
   
})


export const main = proxy({
   theme: 'theme-red',
   editModal: false,
   settingModal: false,
   running: false,
})



interface Edit {
   task: TaskItem;
   id: number;
   setTask: (id: number) => void;
   setName: (n: string) => void;
   incTime: () => void;
   decTime: () => void;
   incCount: () => void;
   decCount: () => void;
   submit: (close: () => void) => void;
}

export const edit = proxy<Edit>({
   task: editDefault,
   id: 0,
   setTask: (id) => {
      if(id == -1){
         edit.task = editDefault
      }else{
         edit.task = store.tasks.find(task => task.id === id) as TaskItem
      }
   },
   setName: (n) => {
      edit.task.name = n
   },
   incTime: () => {
      if(edit.task.time.total.min < 60){
         edit.task.time.total.min += 5
      }
   },
   decTime: () => {
      if(edit.task.time.total.min > 5){
         edit.task.time.total.min -= 5
      }
   },
   incCount: () => {
      if(edit.task.count.total < 20){
         edit.task.count.total += 1
      }
   },
   decCount: () => {
      if(edit.task.count.total > 1){
         edit.task.count.total -= 1
      }
   },
   submit: (close) => {
      if(edit.task.fresh){
         store.add(edit.task)
      }else{
         store.update(edit.task.id, edit.task)
      }
      close()
   }
})




export interface IActiveStore{
   task: TaskItem;
   id: number;
   setId: (id: number) => void;
   updateTime: (t: {min: number, sec: number}) => void;
   updateCount: () => void;
}
export const active = proxy<IActiveStore>({
   task: activeDefault,
   id: 0,
   setId: (id) => {
      const idx = store.tasks.findIndex(task => task.id === id)
      active.id = id
      if(main.theme == 'theme-red'){
         active.task = store.tasks[idx] as TaskItem
      }
   },
   updateTime: (t) => {
      if(main.theme === 'theme-red'){
         const id = active.id
         const task = active.task
         task.time.current = t
         store.update(id, task)
      }
   },
   updateCount: () => {
      if(main.theme === 'theme-red'){
         const task = active.task
         const id = active.id
         task.count.current += 1
         task.time.current = task.time.total
         store.update(id, task)
         if(task.time.current == task.time.total){
            store.toggleComplete(id)
         }
      }
   }
})
