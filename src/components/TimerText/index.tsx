import { useTasksStore } from '../../stores'

export const TimerText = () => {
   const task = useTasksStore((state) => state.activeTask)

   return(
      <div className="flex justify-center items-center pb-3 w-96  ">
         <div className='bg-primary pl-3 text-2xl transition ease-in-out delay-150'>
            {task && task.name}
         </div>
      </div>
   )
}
