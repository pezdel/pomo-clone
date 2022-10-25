import React from 'react'
import { ModalTemplate } from '..'
import { UpSvg, DownSvg } from '../../utils/svg'
import { TaskItem } from '../../utils/types'
import { useTasksStore, useIdStore, useActiveStore } from '../../stores'
import { useEditTask } from './hooks'
import { Button } from '../../components/Button'
import shallow from 'zustand/shallow'



export const EditModal: React.FC<{
   editTask: TaskItem, 
   close: () => void
}> = ({
   editTask, 
   close,
}) => {
   const { task, setName, timeItem, countItem } = useEditTask(editTask)
   const addTask = useTasksStore((state) => state.add)
   const updateTask = useTasksStore((state) => state.update)
   const [id, setId] = useIdStore((state) => [state.id, state.setId], shallow)
   const setActiveId = useActiveStore((state) => state.setActiveId)


   const handleSubmit = () => {
      if(task.fresh){
         addTask({...task, id: id, fresh: false})
         setActiveId(id)
         setId()
      }else{
         updateTask(task.id, task)
      }
      close()
   }
   

   return(
      <ModalTemplate close={close}>
         <div className='h-64 w-80 border-2 flex flex-col rounded-lg justify-between bg-white'>
            <input placeholder={task.name} onChange={(e) => setName(e.target.value)} className="w-full shadow-xl rounded-lg h-14 form-control block text-base " />

            <div className="flex w-full justify-between px-6 ">
               <Counter type="Count" item={countItem} />
               <Counter type="Time" item={timeItem} />
            </div>
            
            <div className="flex justify-between bg-gray-300 shadow-lg">
               {/* {!edit.fresh && <DeleteButton id={edit.id} close={close} />} */}
               <div className='flex w-full h-14 pr-2 justify-end items-center'>
                  <Button 
                     className="h-9 w-16 mx-1 text-gray-600 text-sm font-medium"
                     onClick={close}
                     text="Cancel"
                     />
                  <Button 
                     className="h-8 w-16 mx-1 bg-gray-800 text-gray-200 rounded-lg text-sm font-normal hover:bg-gray-900"
                     onClick={handleSubmit}
                     text="Save"
                     />
               </div>
            </div>
         </div>
      </ModalTemplate>
   )
}



const Counter: React.FC<{item: Item, type: string}> = ({item, type}) => {

   return(
      <>
         <div className="flex flex-col w-24 h-28 justify-between py-1.5">
            <div className="flex justify-center text-lg border-gray-300">
               {type} 
            </div>
            <div className="flex justify-center text-4xl">
               {item.val}{type=="Time" ? ":00" : ""}
            </div>
            <div className="flex justify-between w-full px-2 ">
               <Button 
                  onClick={item.dec}
                  className="flex justify-center border-2 shadow-lg px-1.5 py-1"
                  svg={<DownSvg />}
                  /> 
               <Button 
                  onClick={item.inc}
                  className="flex justify-center border-2 shadow-lg px-1.5 py-1"
                  svg={<UpSvg/>}
                  />
            </div>
         </div>
      </>
   )
}




//figure this one out
const DeleteButton: React.FC<{id: number, close: () => void}> = ({id, close}) => {
   const tasks = useTasksStore((state) => state.tasks)
   const removeTask = useTasksStore((state) => state.remove)
   const [activeId, setActiveId] = useActiveStore((state) => [state.activeId, state.setActiveId], shallow)

   const handleDelete = () => {
      if(activeId === id && tasks[0] != undefined){
         setActiveId(tasks[0].id)
      }
      removeTask(id)
      close()
   }

  return(
      <div className="flex justify-center items-center pl-2">
         <button onClick={handleDelete} className="bg-red-900 flex items-center justify-center h-8 w-16 text-gray-200 rounded-lg text-sm font-normal hover:bg-red-800 ">
            Delete
         </button>
      </div>
   )
}
