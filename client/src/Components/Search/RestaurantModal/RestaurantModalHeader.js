import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../../App";

function RestaurantModalHeader(props) {
  console.log(props);
  const { logo, name, town } = props.headerDetails;

  const { user, setUser } = useContext(userContext);
  const { setShowModal } = props;

  return (
    <div className="flex items-center px-3 py-4 justify-around border-b border-solid border-blueGray-200 rounded-t">
      <img className="w-20" src={logo} alt={`${name} Logo`} />
      <h3 className="text-2xl font-semibold">
        {name} - {town}
      </h3>
      <button
        className=""
        onClick={() => {
          setShowModal(false);
        }}
      >
        <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
          &#10006;
        </span>
      </button>
    </div>
  );
}

export default RestaurantModalHeader;
