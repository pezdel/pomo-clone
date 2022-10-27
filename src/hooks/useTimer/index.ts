import { useState, useEffect } from 'react'
import { TimeItem } from '../../utils/types'
import { useMainStore } from '../../stores'
import shallow from 'zustand/shallow'


//so i think we do the normal setting method and then pull in the task here?
//and make updates?


export const useTimer = (startTime: TimeItem | undefined) => {
   const [running, setRunning] = useMainStore((state) => [state.running, state.setRunning], shallow)
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
