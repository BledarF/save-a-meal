import React from "react";

function AddressTab(props) {
  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Postcode: </div>
            <div className="table-cell">{props.postcode}</div>
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Street: </div>
            <div className="table-cell">{props.streetname}</div>
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Town: </div>
            <div className="table-cell">{props.town}</div>
          </div>
        </div>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ">
        Edit
      </button>
    </div>
  );
}

export default AddressTab;
