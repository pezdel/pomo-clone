import { useEffect } from 'react'
import { settingsColors } from '../../../utils/utils'
import { useMainStore } from '../../../stores'
import { SaveSvg } from '../../../utils/svg'
import { ModalTemplate } from '../Template'
import { Button } from '../../utils'
import { useSettingsStore } from '../../../stores/SettingStore'
import { SettingItem } from './SettingItem'
import shallow from 'zustand/shallow'


export const SettingModal: React.FC = () => {
   const [settings, setSettings] = useSettingsStore((state) => [state.settings, state.setSettings], shallow)
   const [items, setItems] = useSettingsStore((state) => [state.items, state.setItems], shallow)
   const setSettingModal = useMainStore((state) => state.setSettingModal)
   
   useEffect(() => {
      setItems(settings)
   },[])

   const save = () => {
      setSettings({
         main: items.main.value, 
         short: items.short.value, 
         long: items.long.value
      })
      setSettingModal(false)
   }

   return(
      <ModalTemplate close={() => setSettingModal(false)}>
         <div className='w-72 bg-white rounded-md border border-2 '>
            <h1 className="bg-white shadow-lg rounded-tr-md rounded-tl-md flex justify-center items-center h-10 text-xl underline font-semibold">
               Time Settings
            </h1>
            <SettingItem item={items.main} color={settingsColors.red} />
            <SettingItem item={items.short} color={settingsColors.teal} />
            <SettingItem item={items.long} color={settingsColors.blue} />
            <div className="flex items-center justify-center bg-gray-400 w-full h-14 rounded-bl-md rounded-br-md border-t-2">
               <Button 
                  className="flex items-center px-4 py-1.5 rounded-md  font-semibold"
                  text="Cancel"
                  onClick={() => setSettingModal(false)}
                  />
               <Button 
                  className="flex items-center px-4 py-1.5 rounded-md border border-3 font-semibold shadow-lg ml-4"
                  svg={<SaveSvg />}
                  onClick={save}
                  text="Save"
                  />
            </div>
         </div>
      </ModalTemplate>
   )
}




