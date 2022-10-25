import { Button } from '../Button'
import { TaskListItem } from './TaskListItem'
import { AddSvg } from '../../utils/svg'
import { useTasksStore } from '../../stores'
import { editDefault } from '../../utils/utils'
import { TaskItem } from '../../utils/types'


const TaskList: React.FC<{
   openEdit: (t: TaskItem) => void,
   activeTask: TaskItem,
   setActiveId: (id: number) => void,
}> = ({
   openEdit,
   activeTask,
   setActiveId
}) => {
   const tasks = useTasksStore((state) => state.tasks)

   return(
      <>
         <div className="flex justify-center items-center pb-3 w-96 ">
            <div className='bg-primary pl-3 text-2xl'>
               {activeTask && activeTask.name}
            </div>
         </div>
         <Button 
            text="AddTask"
            className="flex items-center justify-center w-full h-14 bg-dark border border-dashed rounded-md text-gray-200 font-normal"
            onClick={() => openEdit(editDefault)} 
            svg={<AddSvg />} 
            />
         <div className="h-60 overflow-auto mt-1">
            {tasks.map((item, i) => 
               <TaskListItem 
                  key={i} 
                  item={item} 
                  openEdit={openEdit}
                  activeTask={activeTask}
                  setActiveId={setActiveId}
                  />
            )}
         </div>
      </>
   )
}
export default TaskList



