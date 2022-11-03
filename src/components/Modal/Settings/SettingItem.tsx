import { DownSvg, UpSvg } from '../../../utils/svg'
import { useSettingsStore } from '../../../stores'
import { Item } from '../../../stores/SettingStore';
import { Button } from '../../Button'

interface ISettingItem {
   item: Item;
   color: string;
}
export const SettingItem: React.FC<ISettingItem> = ({item, color}) => {
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

