import { useEffect, useState } from "react";

function Navbar() {
  const buttonComponent = function getNavbarButtonComponent(buttonName) {
    const href = `/${buttonName.toLowerCase()}`;
    return (
      <a
        href={href}
        class="nav-btn py-4 px-2 text-yellow-500 font-semibold hover:text-yellow-900 transition duration-300"
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
      </div>
    </nav>
  );
}

export default Navbar;
