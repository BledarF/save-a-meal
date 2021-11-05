import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";
import loadingGif from "./loading.gif";

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("loading");
    console.log(loading);
    setLoading(false);
  }, [restaurants]);

  const loadingComponent = function getLoadingComponent() {
    return (
      <img
        className="loading-gif"
        src={loadingGif}
        alt="loading restaurants gif"
      />
    );
  };

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar
          setLoading={setLoading}
          setRestaurants={setRestaurants}
          setBookingStatus={setBookingStatus}
          setSearchStatus={setSearchStatus}
        />
      </div>
      {loading ? (
        loadingComponent()
      ) : (
        <div className="flex flex-row justify-center">
          <Results
            restaurants={restaurants}
            bookingStatus={bookingStatus}
            setBookingStatus={setBookingStatus}
            searchStatus={searchStatus}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
