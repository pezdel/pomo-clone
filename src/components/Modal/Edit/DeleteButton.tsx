import { useTasksStore } from '../../../stores'


export const DeleteButton: React.FC<{id: number}> = ({id}) => {
   const remove = useTasksStore((state) => state.remove)

   return(
      <div className="flex justify-center items-center pl-2">
         <button onClick={() => remove(id)} className="bg-red-900 flex items-center justify-center h-8 w-16 text-gray-200 rounded-lg text-sm font-normal hover:bg-red-800 ">
            Delete
         </button>
      </div>
   )
}
