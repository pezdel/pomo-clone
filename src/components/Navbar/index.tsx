import React from 'react'
import { Button } from '../utils'
import { ReportSvg, SettingSvg, LoginSvg } from '../../utils/svg'
import { useMainStore } from '../../stores'


export const Navbar: React.FC = () => {
   const setSettingModal = useMainStore((state) => state.setSettingModal)
   const baseStyle = 'inline-block flex items-center mx-1 px-3 py-1 text-white font-light text-xs leading-tight rounded-md hover:bg-red-400 transition ease-in-out delay-150'

   return (
      <>
         <div className="w-72">
            <Button 
               text='PomoClone' 
               className={`${baseStyle} + hover:bg-primary `}
               />
         </div>
         <div className="flex pr-3 w-60 justify-end">
            <Button 
               text={"Report"} 
               svg={<ReportSvg />} 
               className={`${baseStyle} + bg-light`} 
               />
            <Button 
               text={"Setting"} 
               onClick={() => setSettingModal(true)} 
               svg={<SettingSvg />} 
               className={`${baseStyle} + bg-light`} 
               />
            <Button 
               text={"Login"} 
               svg={<LoginSvg />} 
               className={`${baseStyle} + bg-light`} 
               />
         </div>
      </>
   )
}
