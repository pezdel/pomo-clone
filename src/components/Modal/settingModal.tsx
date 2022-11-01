import { useMainStore } from '../../stores'
import { ModalTemplate } from '../utils'

export const SettingModal: React.FC = () => {
   const setSettingModal = useMainStore((state) => state.setSettingModal)

   return(
      <ModalTemplate close={() => setSettingModal(false)}>
         <div className='h-96 w-60 border-2 bg-dark'>
            Setting
         </div>
      </ModalTemplate>
   )
}

