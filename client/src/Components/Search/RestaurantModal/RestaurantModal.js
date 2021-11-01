import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RestaurantModalHeader from "./RestaurantModalHeader";
import RestaurantModalBody from "./RestaurantModalBody";

function RestaurantModal(props) {
  const { logoUrl, name, address, imgUrl, rating, times, description, slots } =
    props.restaurantDetails;
  const headerDetails = { logoUrl, name, address };
  const bodyDetails = { address, imgUrl, rating, times, description, slots };
  const { setShowModal } = props;
  const [hasBooked, setHasBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const buttonComponent = function getConfirmOrderButtonComponent(btnText) {
    return (
      <button
        className="bg-yellow-500 hover:bg-yellow-900 transition duration-200 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => handleBook()}
      >
        {btnText}
      </button>
    );
  };

  const handleBook = function handleBookRestaurantButton() {
    // use serer to book slot
    const bookingDetails = {
      id: (Math.random() + 1).toString(36).substring(4).toUpperCase(),
      address,
      name,
      times,
    };

    setBookingDetails(bookingDetails);
    // assuming it has booked
    setHasBooked(true);
  };

  const restaurantModal = function getRestaurantModalComponent() {
    return (
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <RestaurantModalHeader
          setShowModal={setShowModal}
          headerDetails={headerDetails}
        />
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <RestaurantModalBody bodyDetails={bodyDetails} />
        </div>
        {/*footer*/}
        <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
          {buttonComponent("Book")}
        </div>
      </div>
    );
  };

  const bookedModal = function getBookedSuccessfullyModalComponent() {
    return (
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <div className="flex items-center px-3 py-4 justify-around border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-2xl font-semibold text-white">....</h3>
          <h3 className="text-2xl font-semibold mb-0">Successfully Booked!</h3>
          <button className="" onClick={() => setShowModal(false)}>
            <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
              &#10006;
            </span>
          </button>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <div>
            <div className="flex justify-center flex-col items-center">
              <div className="upper-body-wrapper flex justify-start items-center flex-col w-4/5">
                <div className="upper-body-text text-xl flex flex-col items-center justify-center text-base w-full">
                  <p>Your Unique ID is</p>
                  <p className="text-2xl font-bold">{bookingDetails.id}</p>
                </div>
              </div>
              <div className="lower-body-wrapper text-left flex items-center justify-center flex-col w-full">
                <div className="description-wrapper flex flex-col items-center justify-center text-xl w-full">
                  <h3 className="text-xl">Booking Details</h3>
                  <div className="border-black border-2 p-3 m-2 w-4/5">
                    <p className="text-base">Name: {bookingDetails.name}</p>
                    <p className="text-base">
                      Address: {bookingDetails.address.streetName}
                    </p>
                    <p className="text-base">Time: {bookingDetails.times}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*footer*/}
      </div>
    );
  };

  return (
    <>
      <div
        // onClick={() => setShowModal(false)}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-1/3 my-6 mx-auto max-w-6xl">
          {hasBooked ? bookedModal() : restaurantModal()}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default RestaurantModal;
