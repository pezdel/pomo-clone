import React  from 'react'
import { ModalTemplate } from '../Template'
import { useTasksStore, useMainStore, useEditStore } from '../../../stores'
import { Button } from '../../Button'
import { Counter } from './Counter' 
import { DeleteButton } from './DeleteButton'


//TODO: change counter props
export const EditModal: React.FC = () => {
   const { task, changeName, incCount, decCount, incTime, decTime } = useEditStore()
   const setEditModal = useMainStore((state) => state.setEditModal)
   const saveEdit = useTasksStore((state) => state.saveEdit)
   
   return(
      <ModalTemplate close={setEditModal}>
         <div className='h-80 w-96 border-2 flex flex-col rounded-lg justify-between bg-white'>
            <input placeholder={task.name} onChange={(e) => changeName(e.target.value)} className="w-full shadow-xl rounded-lg h-16 form-control block text-base text-xl " />

            <div className="flex w-full justify-between px-10 ">
               <Counter type="Count" inc={incCount} dec={decCount} val={task.count} />
               <Counter type="Time" inc={incTime} dec={decTime} val={task.min} />
            </div>

            <div className="flex justify-between bg-gray-300 shadow-lg">
               {task.id != -1 && <DeleteButton id={task.id} />}
               <div className='flex w-full h-16 pr-2 justify-end items-center'>
                  <Button 
                     className="h-10 w-16 mr-5 text-gray-600 text-lg font-medium "
                     onClick={() => setEditModal(false)}
                     text="Cancel"
                     />
                  <Button 
                     className="h-10 w-20 mx-1 bg-gray-800 text-gray-200 rounded-lg text-lg font-normal hover:bg-gray-900"
                     onClick={() => saveEdit(task.id, task)}
                     text="Save"
                     />
               </div>
            </div>
         </div>
      </ModalTemplate>
   )
}




