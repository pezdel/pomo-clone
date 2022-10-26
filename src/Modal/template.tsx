export const ModalTemplate:React.FC <{children: any, close: any}> = ({children, close}) => {

   const handleClose =(e: any) => {
      if(e.target.id == 'modal') {
         close(false)
      }
   }
   return (
      <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{background: "rgba(0,0,0,.7)"}} >
         <div id="modal" onClick={handleClose} className='flex w-full h-screen justify-center items-center '>
            {children}
         </div>
      </div>
   )
}