import { ModalTemplate } from '../utils'



export const SettingModal: React.FC<{close: () => void}> = ({close}) => {
   return(
      <ModalTemplate close={close}>
         <div className='h-96 w-60 border-2 bg-dark'>
            Setting
         </div>
      </ModalTemplate>
   )
}
