import { useState, useEffect } from 'react'
import { TimeItem } from '../../utils/types'
import { useTimerStore } from '../../stores'
import shallow from 'zustand/shallow'




export const useTimer = (startTime: TimeItem | undefined) => {
   const [running, setRunning] = useTimerStore((state) => [state.running, state.setRunning], shallow)
   const [finished, setFinished] = useState(false) 
   const [min, setMin] = useState(0)
   const [sec, setSec] = useState(0)

   useEffect(() => {
      if(!startTime) return
      setMin(startTime.min)
      setSec(startTime.sec)
   },[startTime])


   useEffect(() => {
      let interval
      if(running){
         interval = setInterval(() => {
            if(sec === 0 && min === 0){
               setRunning(false)
               setFinished(true)
               return () => clearInterval(interval)
            }else if(sec === 0){
               setSec(59)
               setMin(prev => prev - 1)
            }else(
               setSec(prev => prev - 1)
            )
         }, 1000)
      }else if(!running && min !== 0){
         clearInterval(interval)
      }
      return() => clearInterval(interval)
   },[running, sec])


   function toggle(){
      if(!running && finished){
         setFinished(false)
      }
      setRunning(!running)
   } 

   return {time: {min: min, sec: sec}, startStop: toggle, running: running, finished: finished}
}