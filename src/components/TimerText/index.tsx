import { useActiveTask } from '../../hooks'

export const TimerText = () => {
   const task = useActiveTask()
   return(
      <div className="flex justify-center items-center pb-3 w-96 ">
         <div className='bg-primary pl-3 text-2xl'>
            {task && task.name}
         </div>
      </div>
   )
}
