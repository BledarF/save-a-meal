import { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RestaurantModalHeader from "./RestaurantModalHeader";
import RestaurantModalBody from "./RestaurantModalBody";
import { userContext } from "../../../App";
// import set from "date-fns/set/index";

function RestaurantModal(props) {
  const { user, setUser } = useContext(userContext);
  const { bookingStatus, setBookingStatus, restaurantId } = props;
  const [bookCount, setBookCount] = useState(true);
  const [modalHeaderDetails, setModalHeaderDetails] = useState();
  const [modalBodyDetails, setModalBodyDetails] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [orderCheck, setOrderCheck] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (restaurantId) {
      getRestaurantDetails(restaurantId);
    }
  }, []);

  async function getRestaurantDetails(restaurantId) {
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Access: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `http://localhost:8080/api/restaurants/${restaurantId}`,
      requestOptions
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const restaurantDetails = jsonResponse.restaurant[0];
    const restaurantReview = jsonResponse.review;
    const resLoginStatus = jsonResponse.loggedIn;
    const resOrderCheck = jsonResponse.ordered;
    const user = jsonResponse.type;

    setUserType(user);
    setLoginStatus(resLoginStatus);
    setOrderCheck(resOrderCheck);

    const {
      name,
      town,
      logourl,
      streetname,
      postcode,
      imageurl: imageUrl,
      start_time: startTime,
      end_time: endTime,
      description,
      current_slots: slots,
    } = restaurantDetails;
    setModalHeaderDetails({
      name: name,
      town: town,
      logo: logourl,
    });
    setModalBodyDetails({
      streetname: streetname,
      postcode: postcode,
      imageUrl: imageUrl,
      startTime: startTime,
      endTime: endTime,
      description: description,
      slots: slots,
      review: restaurantReview,
    });
  }

  const { setShowModal } = props;
  const [hasBooked, setHasBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBook = async function handleBookRestaurantButton(restaurantId) {
    try {
      setBookCount(false);
      const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          Access: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `http://localhost:8080/api/customers/${user}/restaurant/${restaurantId}/order`,
        requestOptions
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.message === "Already Booked!") {
        console.log("runs");
        // setBookStatus(false);
      }

      let bookingDetails = {
        id: jsonResponse.booking_id,
        streetname: modalBodyDetails.streetname,
        town: modalHeaderDetails.town,
        postcode: modalBodyDetails.postcode,
        name: modalHeaderDetails.name,
        startTime: modalBodyDetails.startTime.slice(0, 5),
        endTime: modalBodyDetails.endTime.slice(0, 5),
      };
      setBookingDetails(bookingDetails);
      setHasBooked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonComponent = function getConfirmOrderButtonComponent(
    btnText,
    restaurantId
  ) {
    return (
      <div>
        {loginStatus && !orderCheck && userType === "customer" ? (
          <button
            className="bg-yellow-500 hover:bg-yellow-900 transition duration-200 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={async () => {
              await handleBook(restaurantId);
            }}
          >
            {btnText}
          </button>
        ) : !loginStatus ? (
          "Please login to book an order!"
        ) : userType === "customer" ? (
          "You have already ordered for today. Please try again tomorrow."
        ) : (
          "You cannot make a order as a restaurant. Please login as a customer."
        )}
      </div>
    );
  };

  const restaurantModal = function getRestaurantModalComponent(restaurantId) {
    return (
      <div className="overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <RestaurantModalHeader
          setShowModal={setShowModal}
          headerDetails={modalHeaderDetails}
        />
        <div className="relative flex-auto">
          <RestaurantModalBody bodyDetails={modalBodyDetails} />
        </div>
        <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
          {buttonComponent("Book", restaurantId)}
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
                      Address: {bookingDetails.streetname}
                    </p>
                    <p className="text-base">
                      Time: {bookingDetails.startTime} -{" "}
                      {bookingDetails.endTime}
                    </p>
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
        className="max-w-2/3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
      >
        <div className="h-2/3 relative w-3/5 my-6 mx-auto max-w-6xl">
          {modalBodyDetails
            ? hasBooked
              ? bookedModal()
              : restaurantModal(restaurantId)
            : ""}
        </div>
      </div>
      <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default RestaurantModal;
