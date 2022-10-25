import { useState } from 'react'


export const useSettingModal = () => {
   const [modal, setModal] = useState(false)

   const handleOpen = () => {
      setModal(true)
   }
   const handleClose = () => {
      setModal(false)
   }
   
   return {settingModal: modal, openSetting: handleOpen, closeSetting: handleClose}
}

