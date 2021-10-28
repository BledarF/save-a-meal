import React from "react";

function AccountTab(props) {
  return (
    <div>
      <div class="table w-full text-left pl-14">
        <div class="table-row-group">
          <div class="table-row">
            <div class="table-cell pb-1">Email: </div>
            <div class="table-cell">{props.email}</div>
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Username: </div>
            <div class="table-cell">{props.username}</div>
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Password: </div>
            <div class="table-cell">****************</div>
          </div>
        </div>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ">
        Edit
      </button>
    </div>
  );
}

export default AccountTab;
