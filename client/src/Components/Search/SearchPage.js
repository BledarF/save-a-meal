import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(true);

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar
          setRestaurants={setRestaurants}
          setBookingStatus={setBookingStatus}
        />
      </div>
      <div className="flex flex-row">
        <Results
          restaurants={restaurants}
          bookingStatus={bookingStatus}
          setBookingStatus={setBookingStatus}
        />
      </div>
    </div>
  );
}

export default SearchPage;
