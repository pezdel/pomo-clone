import React from 'react'
import { Button } from '../utils'
import { ReportSvg, SettingSvg, LoginSvg } from '../../utils/svg'


export const Navbar: React.FC<{openSetting: () => void}> = ({openSetting}) => {
   const baseStyle = 'inline-block flex items-center mx-1 px-3 py-1 text-white font-light text-xs leading-tight rounded-md hover:bg-red-400 transition duration-150 ease-in-out '

   return (
      <>
         <div className="w-72">
            <Button 
               text='PomoReact' 
               className={`${baseStyle} + hover:bg-primary text-lg bg-primary font-semibold`}
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
               onClick={openSetting} 
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
