import React from 'react'
import { Button } from '../Button'
import { ReportSvg, SettingSvg, LoginSvg } from '../../utils/svg'
import { useMainStore } from '../../stores'


export const Navbar: React.FC = () => {
   const setSettingsModal = useMainStore((state) => state.setSettingsModal)
   const baseStyle = 'inline-block flex items-center mx-1.5 px-3 py-2 text-white font-light text-md leading-tight rounded-md hover:bg-red-400 transition ease-in-out delay-150'

   return (
      <>
         <div className="w-128">
            <Button 
               text='PomoClone' 
               className={`${baseStyle} + hover:bg-primary text-xl font-semibold `}
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
               onClick={() => setSettingsModal(true)} 
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
