import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState("");

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar
          setRestaurants={setRestaurants}
          setBookingStatus={setBookingStatus}
          setSearchStatus={setSearchStatus}
        />
      </div>
      <div className="flex flex-row justify-center">
        <Results
          restaurants={restaurants}
          bookingStatus={bookingStatus}
          setBookingStatus={setBookingStatus}
          searchStatus={searchStatus}
        />
      </div>
    </div>
  );
}

export default SearchPage;
