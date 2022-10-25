import { useState, useEffect } from 'react'
import { TaskItem } from '../../utils/types';



interface IncDec {
  val: number;
  inc: () => void;
  dec: () => void;
}
export interface EditTask {
   task: TaskItem;
   setName: (n: string) => void,
   timeItem: IncDec; 
   countItem: IncDec;
}



export const useEditTask = (t: TaskItem) => {
  const [task, setTask] = useState(t)

  useEffect(() => {
    setTask(t)
  },[t])


  function setName(s: string) {
    setTask({...task, name: s})
  }
  function incTime() {
    if(task.time.total.min < 60){
      setTask({...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min + 5}}})
    }
  }
  function decTime() {
    if(task.time.total.min > 5){
      setTask({...task, time: {...task.time, total: {...task.time.total, min: task.time.total.min - 5}}})
    }
  }
  function incCount() {
    if(task.count.total < 20){
      setTask({...task, count: {...task.count, total: task.count.total + 1}})
    }
  }
  function decCount() {
  if(task.count.total > 1){
      setTask({...task, count: {...task.count, total: task.count.total - 1}})
    }
  }
  

  return {
    task: task,
    setName: setName,
    timeItem: {
      val: task.time.total.min,
      inc: incTime,
      dec: decTime,
    },
    countItem: {
      val: task.count.total,
      inc: incCount,
      dec: decCount
    },
  };
};


//local stuff
   // const [edit, setEdit] = useState<TaskItem>(editDefault)
   // const [name, setName] = useState<string>('')
   // const timeItem = useTime(0)
   // const countItem = useCount(0)

   

   // useLayoutEffect(() => {
   //    if(task){
   //       setEdit(task)
   //       setName(task.name)
   //       timeItem.setVal(task.time.total.min)
   //       countItem.setVal(task.count.total)
   //    }
   // }, [task])


   // const handleSubmit = () => {
   //    const ph = {
   //       ...edit, 
   //       name: name, 
   //       time: {current: {min: timeItem.val, sec: 0}, total: {min: timeItem.val,sec: 0}}, 
   //       count: {current: 0, total: countItem.val}
   //    }
   //    if(edit.fresh){
   //       const pp = {...ph, id: id, fresh: false}
   //       addTask(pp)
   //       setActiveTask(pp)
   //       setId()
   //    }else{
   //       updateTask(ph.id, ph)
   //    }
   //    close()
   // }