import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";

function SearchPage() {
  const [userPostcodeInput, setUserPostcodeInput] = useState("");

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar setUserPostcodeInput={setUserPostcodeInput} />
      </div>
      <div className="flex flex-row">
        <Results />
      </div>
    </div>
  );
}

export default SearchPage;
