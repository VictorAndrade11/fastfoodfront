import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import jantandoImage from "../assets/images/jantando.png";

export function FinishOrderModal({ isOpened }) {
  const navigate = useNavigate();
  const handleClose = () => {
    document.body.style.overflow = "auto";
    navigate("/cozinha");
  };

  if (!isOpened) return;
  document.body.style.overflow = "hidden";
  return (
    <div
      className="fixed z-30 w-full h-full bg-black-900/50 overflow-y-auto p-20 flex items-center justify-center"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="w-72 flex flex-col justify-center items-center p-6 font-roboto bg-white-100 rounded-xl sm:w-[28rem] sm:left-[calc(50%_-_14rem)] lg:w-[42rem] lg:left-[calc(50%_-_21rem)] lg:items-start  mt-12 gap-4">
        <div className="w-full flex justify-end items-center">
          <button onClick={handleClose}>
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6 pb-10">
          <img src={jantandoImage} alt="checked" />
          <h1 className="text-2xl font-bold text-center">
            Pedido realizado com sucesso!
          </h1>
          <p>O pedido foi encaminhado para a cozinha</p>
        </div>
      </div>
    </div>
  );
}
