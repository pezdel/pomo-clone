import React, { useLayoutEffect, useState } from 'react'
import { ModalTemplate } from '.'
import { UpSvg, DownSvg } from '../../utils/svg'
import { TaskItem } from '../../utils/types'
import { editDefault } from '../../utils/utils'
import { useTasksStore } from '../../stores'



export const EditModal: React.FC<{task: TaskItem, close: () => void}> = ({task, close}) => {
   const addTask = useTasksStore((state) => state.add)
   const updateTask = useTasksStore((state) => state.update)


   //local stuff
   const [edit, setEdit] = useState<TaskItem>(editDefault)
   const [name, setName] = useState<string>('')
   const [time, setTime] = useState<number>(0)
   const [count, setCount] = useState<number>(0)

   useLayoutEffect(() => {
      if(task){
         setEdit(task)
         setName(task.name)
         setTime(task.time.total.min)
         setCount(task.count.total)
      }
   },[task])


   const updateTime = (amt: number) => {
      if(time + amt > 60 || time + amt == 0) return
      setTime(prev => prev + amt)
   }

   const updateCount = (amt: number) => {
      if(count + amt > 20 || count + amt == 0) return 
      setCount(prev => prev + amt)
   }

    

   const handleSubmit = () => {
      const ph = {...edit, 
         name: name, 
         time: {current: {min: time, sec: 0}, total: {min: time,sec: 0}}, 
         count: {current: 0, total: count}
      }
      edit?.fresh ? addTask(ph) : updateTask(ph.id, ph)
      close()
   }

   return(
      <ModalTemplate close={close}>
         <div className='h-64 w-80 border-2 flex flex-col rounded-lg justify-between bg-white'>
            <input placeholder={name} onChange={(e) => setName(e.target.value)} className="w-full shadow-xl rounded-lg h-14 form-control block text-base " />

            <div className="flex w-full justify-between px-6 ">
               <Counter type="Count" val={count} setVal={updateCount} inc={1} />
               <Counter type="Time" val={time} setVal={updateTime} inc={1} />
            </div>
            
            <div className="flex justify-between bg-gray-300 shadow-lg">
               {!edit.fresh && <DeleteButton id={edit.id}/>}
               <div className='flex w-full h-14 pr-2 justify-end items-center'>
                  <button onClick={close}className="h-9 w-16 mx-1 text-gray-600 text-sm font-medium">
                     Cancel
                  </button>
                  <button onClick={handleSubmit} className="h-8 w-16 mx-1 bg-gray-800 text-gray-200 rounded-lg text-sm font-normal hover:bg-gray-900">
                     Save
                  </button>
               </div>
            </div>
         </div>
      </ModalTemplate>
   )
}



const Counter: React.FC<{
   val: number, 
   setVal: (amt: number) => void, 
   inc: number, 
   type: string}> = ({val, setVal, inc, type}) => {

   return(
      <>
         <div className="flex flex-col w-24 h-28 justify-between py-1.5">
            <div className="flex justify-center text-lg border-gray-300">
               {type} 
            </div>
            <div className="flex justify-center text-4xl">
               {val}{type=="Time" ? ":00" : ""}
            </div>
            <div className="flex justify-between w-full px-2 ">
               <button onClick={() => setVal(-inc)} className=" flex justify-center border-2 shadow-lg px-1.5 py-1">
                  <DownSvg />
               </button >
               <button onClick={() => setVal(inc)} className="flex justify-center border-2 shadow-lg px-1.5 py-1">
                  <UpSvg />
               </button>
            </div>
         </div>
      </>
   )
}




const DeleteButton: React.FC<{id: number}> = ({id}) => {
   const setEditModal = useMainStore((state) => state.setEditModal)
   const removeTask = useTasksStore((state) => state.remove)

   const handleDelete = () => {
      removeTask(id)
      setEditModal(false)
   }

  return(
      <div className="flex justify-center items-center pl-2">
         <button onClick={handleDelete} className="bg-red-900 flex items-center justify-center h-8 w-16 text-gray-200 rounded-lg text-sm font-normal hover:bg-red-800 ">
            Delete
         </button>
      </div>
   )
}
