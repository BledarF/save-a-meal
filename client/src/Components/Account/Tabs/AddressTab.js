import React from "react";

function AddressTab(props) {
  return (
    <div>
      <div class="table w-full text-left pl-14">
        <div class="table-row-group">
          <div class="table-row">
            <div class="table-cell pb-1">Postcode: </div>
            <div class="table-cell">{props.postcode}</div>
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Street: </div>
            <div class="table-cell">{props.streetname}</div>
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Town: </div>
            <div class="table-cell">{props.town}</div>
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
