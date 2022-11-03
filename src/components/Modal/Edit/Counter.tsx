import { Button } from '../../Button'
import { UpSvg, DownSvg } from '../../../utils/svg'


export const Counter: React.FC<{
   inc: () => void, 
   dec: () => void, 
   val: number, 
   type: string
}> = ({inc, dec, val, type}) => {
   return(
      <>
         <div className="flex flex-col w-28 h-36 justify-between py-1.5">
            <div className="flex justify-center text-2xl border-gray-300">
               {type} 
            </div>
            <div className="flex justify-center text-5xl">
               {val}{type=="Time" ? ":00" : ""}
            </div>
            <div className="flex justify-between w-full px-2 ">
               <Button 
                  onClick={dec}
                  className="flex justify-center border-2 shadow-lg px-1.5 py-1"
                  svg={<DownSvg />}
                  /> 
               <Button 
                  onClick={inc}
                  className="flex justify-center border-2 shadow-lg px-1.5 py-1"
                  svg={<UpSvg/>}
                  />
            </div>
         </div>
      </>
   )
}


