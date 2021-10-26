import { useEffect, useState } from "react";

function Navbar() {
  const buttonComponent = function getNavbarButtonComponent(buttonName) {
    const href = `/${buttonName.toLowerCase()}`;
    return (
      <a
        href={href}
        class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
      >
        {buttonName}
      </a>
    );
  };

  return (
    <nav>
      <h1>Navbar</h1>
      {buttonComponent("Home")}
      {buttonComponent("Register")}
      {buttonComponent("Account")}
      {buttonComponent("Home")}
    </nav>
  );
}

export default Navbar;
