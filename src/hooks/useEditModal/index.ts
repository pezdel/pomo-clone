import { useState } from 'react'
import type { TaskItem } from '../../utils/types'
import { useEditStore } from "../../stores"
import shallow from 'zustand/shallow'




export const useEditModal = () => {
   const [editTask, setEditTask] = useEditStore((state) => [state.editTask, state.setEditTask], shallow)
   const [modal, setModal] = useState(false)

   const handleOpen = (t: TaskItem) => {
      setEditTask(t)
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }

   return {
      editTask: editTask,
      editModal: modal, 
      openEdit: handleOpen, 
      closeEdit: handleClose,
   }
}


