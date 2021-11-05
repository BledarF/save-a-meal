import { useEffect, useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import LoginModal from "./LoginModal";
import { userContext } from "../../App";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

async function deleteCookie() {
  await fetch(`http://localhost:8080/api/sessions`, {
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
    const endpoint = `/${buttonName.toLowerCase()}`;
    return (
      <NavLink
        className="py-4 px-2 text-black font-semibold hover:text-yellow-900 transition duration-300"
        activeStyle={{ color: "#78350f" }}
        to={endpoint}
      >
        {buttonName}
      </NavLink>
    );
  };

  function loginButton() {
    return (
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-white hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full"
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
          window.location.href = "http://localhost:3000/";
        }}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Log out
      </button>
    );
  }

  return (
    <nav className="flex flex-row justify-end items-start p-6 absolute w-full z-10">
      <div className="buttons-wrapper text-2xl text-black">
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
