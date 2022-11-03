import type { TaskItem } from '../../utils/types'
import { CheckSvg, NotCheckSvg, MenuSvg } from '../../utils/svg'
import { Button } from '../Button'
import { useTasksStore, useEditStore, useMainStore } from '../../stores'


export const TaskListItem: React.FC<{item: TaskItem}> = ({item}) => {
   const [activeId, setActiveId] = useMainStore((state) => [state.activeId, state.setActiveId])
   const toggleComplete = useTasksStore((state) => state.toggleComplete)
   const setEditTask = useEditStore((state) => state.setTask)

   return(
      <div className={`flex items-center  bg-white text-gray-500 h-16 my-1 rounded-md px-2  ${activeId == item.id ? ' bg-red-200 ' : ''}`}>
         <Button 
            className="flex"
            onClick={() => toggleComplete(item.id)}
            svg={item.complete ? <CheckSvg /> : <NotCheckSvg />} 
            />
         
         <div onClick={() => setActiveId(item.id)} className={`ml-2 w-full h-full flex items-center text-xl font-semibold ${item.complete ? ' line-through font-extralight ' : ' '}`} >
            {item.name}
         </div>
         <div className='text-gray-400 mr-2 text-xl'>
            {item.time.total.min}:00
         </div>
         <div className='text-gray-400 mr-2 text-xl'>
            {item.count.current}/{item.count.total}
         </div>

         <Button 
            className="pr-1"
            onClick={() => setEditTask(item.id)}
            svg={<MenuSvg />}
            />
      </div>
   )
}
