import React  from 'react'
import { ModalTemplate } from '../../utils'
import { useTasksStore, useMainStore, useEditStore } from '../../../stores'
import { Button } from '../../utils'
import { Counter } from './Counter' 
import { DeleteButton } from './DeleteButton'


export const EditModal: React.FC = () => {
   const { task, changeName, incCount, decCount, incTime, decTime } = useEditStore()
   const setEditModal = useMainStore((state) => state.setEditModal)
   const saveEdit = useTasksStore((state) => state.saveEdit)
   
   return(
      <ModalTemplate close={setEditModal}>
         <div className='h-64 w-80 border-2 flex flex-col rounded-lg justify-between bg-white'>
            <input placeholder={task.name} onChange={(e) => changeName(e.target.value)} className="w-full shadow-xl rounded-lg h-14 form-control block text-base " />

            <div className="flex w-full justify-between px-6 ">
               <Counter type="Count" inc={incCount} dec={decCount} val={task.count} />
               <Counter type="Time" inc={incTime} dec={decTime} val={task.min} />
            </div>

            <div className="flex justify-between bg-gray-300 shadow-lg">
               {task.id != -1 && <DeleteButton id={task.id} />}
               <div className='flex w-full h-14 pr-2 justify-end items-center'>
                  <Button 
                     className="h-9 w-16 mx-1 text-gray-600 text-sm font-medium"
                     onClick={() => setEditModal(false)}
                     text="Cancel"
                     />
                  <Button 
                     className="h-8 w-16 mx-1 bg-gray-800 text-gray-200 rounded-lg text-sm font-normal hover:bg-gray-900"
                     onClick={() => saveEdit(task.id, task)}
                     text="Save"
                     />
               </div>
            </div>
         </div>
      </ModalTemplate>
   )
}




