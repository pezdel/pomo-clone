import { useState } from 'react'
import { useEditStore } from "../../stores"


export const useEditModal = () => {
   const [modal, setModal] = useState(false)
   const setEditId = useEditStore((state) => state.setEditId)

   const handleOpen = (id: number) => {
      setEditId(id)
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }
   
   return {
      editModal: modal, 
      openEdit: handleOpen, 
      closeEdit: handleClose,
   }
}