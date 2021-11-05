import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";

function ReviewModal(props) {
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);

  async function fetchReview(orderId, restaurantId) {
    const url = `${SERVER_URL}/customers/reviews/restaurant/${restaurantId}/order/${orderId}`;
    const values = { score: rating };
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      props.handleAccept();
      setError("");
      props.setShowModal(false);

      if (response.status === 400) {
        setError(responseJson.message);
      } else {
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError("Something has gone horribly wrong");
    }
  }

  const submitReview = () => {
    fetchReview(props.orderId, props.restaurantId);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className=" pb-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold p-2 pl-3 pb-1 m-0">
                Collect order
              </h3>
              <button
                className="p-2 pr-5 pb-1"
                onClick={() => props.setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative py-1 px-36 flex-auto">
              <h6>Please let us know how you feel about your order: </h6>
              <StarRatings
                rating={rating}
                starRatedColor="blue"
                changeRating={setRating}
                numberOfStars={5}
                name="rating"
              />
            </div>
            {/*footer*/}
            <div className="flex justify-center">
              <div>
                <button
                  onClick={submitReview}
                  className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded-full "
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => props.setShowModal(false)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded-full "
                >
                  Cancel
                </button>
              </div>
            </div>
            {error ? (
              <span className="text-red-500 text-center">{error}</span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ReviewModal;
