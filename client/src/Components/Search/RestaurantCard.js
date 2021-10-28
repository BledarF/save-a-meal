import { useEffect, useContext, useState } from "react";

function RestaurantCard(props) {
  const { imgUrl, name, town, times, distance } = props.details;
  const { setShowModal, setModalDetails } = props;
  return (
    <div
      onClick={() => {
        setShowModal(true);
        setModalDetails(props.details);
      }}
      className="restaurant-card-wrapper text-sm cursor-pointer text-left overflow-hidden flex flex-col justify-center items-center rounded-3xl shadow-xl hover:shadow-2xl transition duration-200"
    >
      <img src={imgUrl} alt={name} className="rounded-xl h-full" />
      <div className="p-2 flex flex-col justify-between items-start">
        <h1 className="text-2xl">
          {name} - {town}
        </h1>
        <p className="text-lg">
          {times} - {distance} away
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;
