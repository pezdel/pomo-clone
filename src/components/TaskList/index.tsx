import { Button } from '../Button'
import { TaskListItem } from './TaskListItem'
import { AddSvg } from '../../utils/svg'
import { useTasksStore, useEditStore } from '../../stores'


export const TaskList: React.FC = () => {
   const tasks = useTasksStore((state) => state.tasks)
   const setEditTask = useEditStore((state) => state.setTask)

   return(
      <>
         <Button 
            text="AddTask"
            className="flex items-center justify-center w-full h-16 bg-dark border border-dashed rounded-md text-gray-200 text-2xl font-normal transition ease-in-out delay-150"
            onClick={() => setEditTask(-1)} 
            svg={<AddSvg />} 
            />
         <div className="h-60 overflow-auto mt-2 w-screen bg-primary">
            {tasks.map((item, i) => 
               <TaskListItem 
                  key={i} 
                  item={item} 
                  />
            )}
         </div>
      </>
   )
}

