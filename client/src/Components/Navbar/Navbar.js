import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const buttonComponent = function getNavbarButtonComponent(buttonName) {
    const href = `/${buttonName.toLowerCase()}`;
    return (
      <a
        href={href}
        class="py-4 px-2 text-yellow-500 font-semibold hover:text-yellow-900 transition duration-300"
      >
        {buttonName}
      </a>
    );
  };

  return (
    <nav className="flex flex-row justify-end p-6 fixed w-full z-10">
      <div className="buttons-wrapper text-xl">
        {buttonComponent("Home")}
        {buttonComponent("Search")}
        {buttonComponent("Register")}
        {buttonComponent("Account")}
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
      </div>
      {showModal ? <LoginModal setShowModal={setShowModal}></LoginModal> : null}
    </nav>
  );
}

export default Navbar;
