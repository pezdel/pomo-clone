import { Button } from '../utils'
import { TaskListItem } from './TaskListItem'
import { AddSvg } from '../../utils/svg'
import { useTasksStore } from '../../stores'


export const TaskList: React.FC<{openEdit: (id: number) => void}> = ({openEdit}) => {
   const tasks = useTasksStore((state) => state.tasks)

   return(
      <>
         <Button 
            text="AddTask"
            className="flex items-center justify-center w-full h-14 bg-dark border border-dashed rounded-md text-gray-200 font-normal"
            onClick={() => openEdit(-1)} 
            svg={<AddSvg />} 
            />
         <div className="h-60 overflow-auto mt-1">
            {tasks.map((item, i) => 
               <TaskListItem 
                  key={i} 
                  item={item} 
                  openEdit={openEdit}
                  />
            )}
         </div>
      </>
   )
}

