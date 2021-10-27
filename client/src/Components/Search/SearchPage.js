import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Results from "./Results";
import "./SearchPage.css";

function SearchPage() {
  // get seatch input
  // send in body of get fetch
  // get

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar />
      </div>
      <div className="flex flex-row">
        <Results />
      </div>
    </div>
  );
}

export default SearchPage;
