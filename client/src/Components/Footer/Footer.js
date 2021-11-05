import React, { useEffect, useState } from "react";

function Footer() {
  const columnItem = function getColumnItemComponent(itemName, endpoint) {
    const redirectLink = endpoint
      ? `/${itemName}`
      : `https://www.${itemName}.com`;
    return (
      <span className="my-2">
        <a
          href={redirectLink}
          className="text-yellow-500  text-md hover:text-yellow-900"
        >
          {itemName}
        </a>
      </span>
    );
  };
  const getColumn = function getFooterColumnComponent(colName, ...colItems) {
    return (
      <div className="flex flex-col">
        <span className="font-bold text-gray-700 uppercase mb-2">
          {colName}
        </span>
        {colItems.map((item) => columnItem(item, colName === "Site Map"))}
      </div>
    );
  };

  return (
    <footer className="footer bg-white relative pt-1 border-b-2 border-yellow-500">
      <div className="container mx-auto px-6">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-around">
            {getColumn("Social Media", "Facebook", "Instagram", "Twitter")}
            {getColumn("Site Map", "Home", "Search", "Register")}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-yellow-500 font-bold mb-2">
              © 2021 by Sohail And His Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
