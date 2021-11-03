import { useEffect, useContext, useState } from "react";

function RestaurantCard(props) {


  let {
    imageurl: imgUrl,
    name,
    town,
    start_time: startTime,
    end_time: endTime,
    distance_from_post: distance,
  } = props.details;

  const { setShowModal, setModalDetails } = props;
  startTime = startTime.slice(0, 5);
  endTime = endTime.slice(0, 5);

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
          {startTime} - {endTime} - {distance} miles
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;
