import { useTasksStore } from '../../stores'

export const TimerText = () => {
   const task = useTasksStore((state) => state.tasks[state.tasks.findIndex(task => task.id === state.activeId)])

   return(
      <div className="flex justify-center items-center pb-3 w-96 ">
         <div className='bg-primary pl-3 text-2xl'>
            {task && task.name}
         </div>
      </div>
   )
}
