import { useEffect, useContext, useState } from "react";

function RestaurantCard(props) {
  const { imgUrl, name, town, times, distance } = props.details;
  return (
    <div className="text-sm cursor-pointer text-left overflow-hidden flex flex-col justify-center items-center rounded-3xl shadow-xl hover:shadow-2xl transition duration-200">
      <img src={imgUrl} alt={name} className="rounded-xl" />
      <div className="p-2 flex flex-col justify-between items-start">
        <h1>
          {name} - {town}
        </h1>
        <p>
          {times} - {distance} away
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;
