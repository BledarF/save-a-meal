import { useEffect, useState, useContext } from "react";
import LoginModal from "./LoginModal";
import { userContext } from "../../App";

async function deleteCookie() {
  const response = await fetch(`http://localhost:8080/api/sessions`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function Navbar(props) {
  const { user, setUser } = useContext(userContext);
  const [showModal, setShowModal] = useState(false);

  const buttonComponent = function getNavbarButtonComponent(buttonName) {
    const href = `/${buttonName.toLowerCase()}`;
    return (
      <a
        href={href}
        className="py-4 px-2 text-yellow-500 font-semibold hover:text-yellow-900 transition duration-300"
      >
        {buttonName}
      </a>
    );
  };

  function loginButton() {
    return (
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Login
      </button>
    );
  }

  function logoutButton() {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteCookie();
          setUser(null);
        }}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Log out
      </button>
    );
  }

  return (
    <nav className="flex flex-row justify-end p-6 fixed w-full z-10">
      <div className="buttons-wrapper text-xl">
        {buttonComponent("Home")}
        {buttonComponent("Search")}
        {buttonComponent("Register")}
        {user ? buttonComponent("Account") : null}
        {user ? logoutButton() : null}
        {!user ? loginButton() : null}
      </div>
      {showModal ? <LoginModal setShowModal={setShowModal}></LoginModal> : null}
    </nav>
  );
}

export default Navbar;
