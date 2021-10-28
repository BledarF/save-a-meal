import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RestaurantModalHeader from "./RestaurantModalHeader";
import RestaurantModalBody from "./RestaurantModalBody";

function RestaurantModal(props) {
  const { logoUrl, name, town, imgUrl, rating, times, description, slots } =
    props.restaurantDetails;
  const headerDetails = { logoUrl, name, town };
  const bodyDetails = { imgUrl, rating, times, description, slots };
  const { setShowModal } = props;

  const buttonComponent = function getConfirmOrderButtonComponent(btnText) {
    return (
      <button
        className="bg-yellow-500 hover:bg-yellow-900 transition duration-200 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => setShowModal(false)}
      >
        {btnText}
      </button>
    );
  };

  return (
    <>
      <div
        // onClick={() => setShowModal(false)}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
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
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default RestaurantModal;
