import { useActiveStore } from '../../stores'

export const TimerText = () => {
   const task = useActiveStore((state) => state.task)

   return(
      <div className="flex justify-center items-center pb-3 w-128 ">
         <div className='bg-primary pl-3 pt-3 text-2xl transition ease-in-out delay-150'>
            {task && task.name}
         </div>
      </div>
   )
}
