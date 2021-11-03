import { useEffect, useContext, useState } from "react";

function RestaurantCard(props) {
  const { setShowModal, setModalDetails } = props;
  //   let {
  //     imageurl: imgUrl,
  //     name,
  //     town,
  //     start_time: startTime,
  //     end_time: endTime,
  //     distance_from_post: distance,
  //   } = props.details;
  //   startTime = startTime.slice(0, 5);
  //   endTime = endTime.slice(0, 5);
  const imgUrl =
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2011%2F01%2F19023215%2Fpeanut-butter-waffles-6806-284-msl0918.jpg&q=85";
  const name = "Mc Donalds";
  const town = "West Drayton";
  const startTime = "17:30:00";
  const endTime = "18:00:00";
  const distance = "4 ";
  return (
    <div
      //   onClick={() => {
      //     setShowModal(true);
      //     setModalDetails(props.details);
      //   }}
      className="restaurant-card-wrapper relative cursor-pointer h-96 text-left overflow-hidden flex flex-col rounded-bl-3xl rounded-tr-3xl shadow-xl hover:shadow-2xl transition duration-200"
    >
      <div className="image-wrapper rounded-bl-3xl h-1/2 overflow-hidden flex justify-center items-center">
        <img src={imgUrl} alt={name} className="" />
      </div>
      <div className="card-text-wrapper p-2 flex flex-col justify-start items-start h-1/2 text-center ml-3">
        <h1 className="text-2xl">{name}</h1>
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
}

export default RestaurantCard;
