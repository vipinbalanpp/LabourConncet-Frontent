import { faEllipsisV, faPaperclip, faPaperPlane, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import image from '../../assets/user.png'


const Messages = () => {
    return (
         <div className='flex'>
        <div className="pt-10">
           <div className="bg-white-400  p-10 border-r-2">
               <input type="text" placeholder="Search Message..." className="border bg-white  h-8 mb-10 placeholder:text-sm ps-2 py-4 mx-4" />
               <div className=" border-b-2 flex p-2 gap-2  justify-between items-center">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm text-green-500">online</p>              
                     </div>
               <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div>  
                <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div>  
                <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div> 
                 <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div>  
                <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div>   
                 <div className=" border-b-2 flex p-2 gap-2 justify-between items-center mt-3">
                   <img className="w-10 h-10 rounded-full" src={image} alt="" />
                   <p className="text-sm font-semibold text-black">Jan Meyer</p>
                   <p className="text-sm">12 Min ago</p>
               </div>
           </div>
        </div>
           <div className='w-full'>
               <div className="border-b-2 flex justify-between items-center mt-16">
                   <div className="flex items-center gap-20">
                   <img src={image} alt=""  className="w-28 h-28 rounded-full p-5 "/>
                   <p className="text-black font-semibold text-xl">Jan Mayar</p>
                   </div>
                   <div className="flex gap-10 me-10">
                       <FontAwesomeIcon icon={faVideo}/>
                       <FontAwesomeIcon icon={faEllipsisV}/>
                   </div>
               </div>
               <div className="absolute bottom-0 w-[700px] border-2 justify-between h-12 items-center flex py-1 ps-3 pe-2 m-10">
                   <div>

               <FontAwesomeIcon icon={faPaperclip} />
               <input type="text" className="bg-white ms-5" placeholder="Reply Mesasge.." />
                   </div>
                   <div>
               <FontAwesomeIcon icon={faSmile} className="ms-3 mb-2"/>
               <FontAwesomeIcon icon={faPaperPlane} className="ms-3 bg-yellow-500 px-4 py-2 text-white"/>
                   </div>
               </div>
           </div>
       </div>
    )
}

export default Messages
