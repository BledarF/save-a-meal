import { useEffect, useState } from "react";
import BuisnessModal from "./BuisnessModal";
import UserModal from "./UserModal";

function Register() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBuisnessModal, setShowBuisnessModal] = useState(false);

  return (
    <div className="flex flex-row flex-wrap justify-items-stretch my-8 h-screen">
      <div
        onClick={() => {
          setShowUserModal(true);
        }}
        className="flex-initial bg-user-login  w-1/2 h-full bg-cover  
      border-solid border-r-2 border-t-4 border-b-4 border-yellow-500 
      hover:border-transparent cursor-pointer
      "
      >
        <span
          className="text-white font-bold text-2xl
        inline-block mt-52
        "
        >
          Register as a Customer
        </span>
      </div>
      <div
        onClick={() => {
          setShowBuisnessModal(true);
        }}
        className="flex-inital  bg-cafe-register bg-opacity-0 w-1/2 h-full bg-cover
      border-solid border-l-2 border-t-4 border-b-4 border-yellow-500 
      hover:border-transparent cursor-pointer
      "
      >
        <span
          className="text-white font-bold text-2xl
          inline-block mt-52
        "
        >
          Register as a Buisness
        </span>
      </div>

      {showUserModal ? (
        <UserModal setShowModal={setShowUserModal}></UserModal>
      ) : null}
      {showBuisnessModal ? (
        <BuisnessModal setShowModal={setShowBuisnessModal}></BuisnessModal>
      ) : null}
    </div>
  );
}

export default Register;
