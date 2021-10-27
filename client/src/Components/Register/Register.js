import { useEffect, useState } from "react";
import UserModal from "./UserModal";

function Register() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-row flex-wrap justify-items-stretch my-8 h-screen">
      <div
        onClick={() => {
          setShowModal(true);
        }}
        className="flex-initial bg-user-login  w-1/2 h-5/6 bg-cover  
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
        className="flex-inital  bg-cafe-register bg-opacity-0 w-1/2 h-5/6 bg-cover
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

      {showModal ? <UserModal setShowModal={setShowModal}></UserModal> : null}
    </div>
  );
}

export default Register;
