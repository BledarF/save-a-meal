import React from "react";

function AccountTab(props) {
  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Email: </div>
            <div className="table-cell">{props.email}</div>
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Telephone: </div>
            <div class="table-cell">{props.telephone}</div>
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Password: </div>
            <div className="table-cell">****************</div>
          </div>
        </div>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ">Edit</button>
    </div>
  );
}

export default AccountTab;
