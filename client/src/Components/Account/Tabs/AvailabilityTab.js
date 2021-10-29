import React from "react";

function AddressTab(props) {
  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Start Time: </div>
            <div className="table-cell">{props.startTime}</div>
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">End Time: </div>
            <div className="table-cell">{props.endTime}</div>
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Capacity: </div>
            <div className="table-cell">{props.capacity}</div>
          </div>
        </div>
      </div>
      <div className="w-full pb-4">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/7">Monday</th>
              <th className="w-1/8">Tuesday</th>
              <th className="w-1/7">Wednesday</th>
              <th className="w-1/7">Thursday</th>
              <th className="w-1/7">Friday</th>
              <th className="w-1/7">Saturday</th>
              <th className="w-1/7">Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {props.days.monday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.tuesday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.wednesday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.thursday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.friday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.saturday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
              <td>
                {props.days.sunday ? (
                  <span>&#10003;</span>
                ) : (
                  <span>&#x2717;</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ">
        Edit
      </button>
    </div>
  );
}

export default AddressTab;
