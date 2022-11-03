import { useEffect } from 'react'
import { useMainStore } from '../../stores'
import { DownSvg, UpSvg, SaveSvg } from '../../utils/svg'
import { ModalTemplate } from '../utils'
import { Button } from '../utils'
import { useSettingsStore } from '../../stores/SettingStore'
import shallow from 'zustand/shallow'




export const SettingModal: React.FC = () => {
   const [settings, setSettings] = useSettingsStore((state) => [state.settings, state.setSettings], shallow)
   const [items, setItems] = useSettingsStore((state) => [state.items, state.setItems], shallow)
   const setSettingModal = useMainStore((state) => state.setSettingModal)

   // const red = "#d95550"
   // const teal = "#4c9195"
   // const blue = "#457ca3"

   const red = "#dd6662"
   const teal = "#5e9ca0"
   const blue = "#5889ac"

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
            <SettingItem item={items.main} color={red} />
            <SettingItem item={items.short} color={teal} />
            <SettingItem item={items.long} color={blue} />
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




interface SettingItem {
   item: Item;
   color: string;
}
const SettingItem: React.FC<SettingItem> = ({item, color}) => {
   const inc = useSettingsStore((state) => state.inc)
   const dec = useSettingsStore((state) => state.dec)

   return(
      <div style={{backgroundColor: color}} className="flex justify-between h-16 shadow-lg px-3 border-t-2 rounded-md">
         <div className="flex justify-center items-center w-full flex-col">
            <div>
               {item.text}:
            </div>
         </div>
         <div className="flex items-center">
            <Button 
               className="flex justify-center border-2 shadow-lg px-1.5 py-1 bg-white"
               svg={<DownSvg />} 
               onClick={() => dec(item.name)} />            
            <div className="px-1.5 w-14 flex justify-center text-white text-xl">
               {item.value}:00
            </div>
            <Button 
               className="flex justify-center border-2 shadow-lg px-1.5 py-1 bg-white"
               svg={<UpSvg />} 
               onClick={() => inc(item.name)} />
         </div>
      </div>
   )
}

