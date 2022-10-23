export const Button: React.FC<{
   className?: string, 
   onClick?: () => void, 
   svg?: any, 
   text?: string}> = ({className, onClick, svg, text}) => {

   return(
      <button type='button' className={className} onClick={onClick}>
         {svg && svg}
         {text}
      </button>
   )
}
