import { IoClose, IoCheckmark } from "react-icons/io5";
import imageBurger from "../assets/images/hamb01.png";
import { useState } from "react";

const Order = ({ order }) => {
  // const {status} = order;
  const [isOpen, setOpen] = useState(false);
  const [isWaiting, setWaiting] = useState(false);



  return (
    <div
      className={`w-full flex flex-col justify-between gap-4 p-2 rounded-lg  
    ${
      !isWaiting ? "border-[1px] border-green-900" : ""
    } shadow-lg transition duration-150 ease-in-out  `}
    onClick={() => {
      setOpen(!isOpen);
    }}
    >
      <div className="flex justify-between items-center p-2">
    <div className="flex">  
    
        <img
          src={imageBurger}
          alt="Order"
          className="w-16 p-1 mr-2 object-contain rounded-md shadow-md"
        />
        <div>
          <h3 className="font-bold">Joãozinho</h3>
          <p className="w-36 truncate text-black-400 lg:w-52">
            1x Smash da casa, 1x Smash da casa, 1x Smash da casa
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IoClose className="w-6 h-6 p-1 text-red-600 bg-red-200/60 rounded-md" />
        <IoCheckmark className="w-6 h-6 p-1 text-green-700 bg-green-100 rounded-md" />
      </div></div>

      <div className={`  w-full  transition duration-300 ease-in-out overflow-hidden ${isOpen? "max-4-80": "max-h-0 " }`}>
      <div className="w-full flex flex-col p-6  mt-6 ">
          <h3 >Observações</h3>
          <textarea
            className="w-full h-24 border-[1px] border-zinc-700 rounded"
          ></textarea>  
        </div>
      </div>
     
   


     
      </div>
          
      

  
  );
};

export default Order;
