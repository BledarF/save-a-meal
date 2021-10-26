import { useEffect, useState } from "react";

function Navbar() {
  const buttonComponent = function getNavbarButtonComponent(buttonName) {
    const href = `/${buttonName.toLowerCase()}`;
    return (
      <a
        href={href}
        class="py-4 px-2 text-white font-semibold hover:text-yellow-900 transition duration-300"
      >
        {buttonName}
      </a>
    );
  };

  return (
    <nav className="flex flex-row justify-end p-6 ">
      <div className="buttons-wrapper text-xl ">
        {buttonComponent("Home")}
        {buttonComponent("Search")}
        {buttonComponent("Register")}
        {buttonComponent("Login")}
      </div>
    </nav>
  );
}

export default Navbar;
