import { useEffect, useContext, useState } from "react";

function RestaurantCard(props) {
  let {
    imageurl: imgUrl,
    name,
    town,
    start_time: startTime,
    end_time: endTime,
    distance_from_post: distance,
    available,
  } = props.details;
  available = false;

  const { setShowModal, setModalDetails } = props;
  startTime = startTime.slice(0, 5);
  endTime = endTime.slice(0, 5);

  const card = function getRestaruantCardComponent(additionalCss) {
    return (
      <div
        onClick={() => {
          setShowModal(true);
          setModalDetails(props.details);
        }}
        className={
          `relative h-max restaurant-card-wrapper relative cursor-pointer h-96 text-left overflow-hidden flex flex-col rounded-bl-3xl rounded-tr-3xl shadow-xl hover:shadow-2xl transition duration-200 ` +
          additionalCss
        }
      >
        <div className="relative image-wrapper rounded-bl-3xl h-1/2 overflow-hidden flex justify-center items-center">
          {!available && <div className="text-4xl absolute"> Unavailable</div>}
          <img src={imgUrl} alt={name} className="min-h-full" />
        </div>
        <div className="card-text-wrapper p-2 flex flex-col justify-start items-start h-1/2 text-center ml-3">
          <h1 className="text-2xl">
            {name}
            <span className="text-base text-yellow-900"> {town}</span>
          </h1>
          <div className="card-details-wrapper">
            <p className="text-xl">
              {town} - {distance} miles
            </p>
            <p className="text-base justify-self-end self-end text-left">
              {startTime} - {endTime}
            </p>
          </div>

          <div className="card-button text-5xl bg-yellow-500 w-20 rounded-tl-3xl text-center text-white py-1">
            &#43;
          </div>
        </div>
      </div>
    );
  };

  return available ? card() : card("opacity-20");
}

export default RestaurantCard;
