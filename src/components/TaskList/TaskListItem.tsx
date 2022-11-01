import type { TaskItem } from '../../utils/types'
import { CheckSvg, NotCheckSvg, MenuSvg } from '../../utils/svg'
import { Button } from '../utils'
import { useTasksStore } from '../../stores'


export const TaskListItem: React.FC<{item: TaskItem}> = ({item}) => {
   const [activeId, setActiveId] = useTasksStore((state) => [state.activeId, state.setActiveId])
   const toggleComplete = useTasksStore((state) => state.toggleComplete)
   const setEditTask = useTasksStore((state) => state.setEditTask)

   return(
      <div className={`flex items-center bg-white border-2 text-gray-500 h-12 my-1 rounded-md px-2 ${activeId == item.id ? ' bg-red-200 ' : ''}`}>
         <Button 
            onClick={() => toggleComplete(item.id)}
            svg={item.complete ? <CheckSvg /> : <NotCheckSvg />} 
            />
         
         <div onClick={() => setActiveId(item.id)} className={`ml-2 w-full h-full flex items-center text-md font-semibold ${item.complete ? ' line-through font-extralight ' : ' '}`} >
            {item.name}
         </div>
         <div className='text-gray-400 mr-2'>
            {item.time.total.min}:00
         </div>
         <div className='text-gray-400 mr-2'>
            {item.count.current}/{item.count.total}
         </div>

         <Button 
            onClick={() => setEditTask(item.id)}
            svg={<MenuSvg />}
            />
      </div>
   )
}
