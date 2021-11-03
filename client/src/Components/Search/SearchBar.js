import { useEffect, useContext, useState } from "react";

function SearchBar(props) {
  const { setRestaurants, setBookingStatus, restaurants } = props;
  const [userInput, setUserInput] = useState("");

  const handleSearch = async function handleSearch() {
    try {
      const requestOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          Access: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:8080/api/restaurants/details/search/${userInput}/proximity/${10000}`,
        requestOptions
      );
      const json = await response.json();
      console.log(json);
      const restaurantsList = json.restaurantDetails;
      console.log(restaurantsList);
      setRestaurants(restaurantsList);
      if (json.message === "Already Booked!") {
        setBookingStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-10 w-2/3 text-2xl">
      <div class="bg-white flex items-center rounded-full shadow-xl">
        <input
          class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Enter Postcode..."
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div class="p-4">
          <button
            onClick={() => handleSearch()}
            class="bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-900 focus:outline-none w-12 h-12 flex items-center justify-center"
          >
            <i class="material-icons text-2xl">&#128269;</i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
