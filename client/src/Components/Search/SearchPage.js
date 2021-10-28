import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";
import { add } from "date-fns";

function SearchPage() {

  // this is a test for git
  const [userPostcodeInput, setUserPostcodeInput] = useState("");

  // get seatch input
  // send in body of get fetch
  // get

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


export default SearchPage;
