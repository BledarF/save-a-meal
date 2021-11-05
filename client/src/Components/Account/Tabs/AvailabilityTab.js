import React, { useState } from "react";
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";

function AddressTab(props) {
  const [editMode, setEditMode] = useState(false);

  const [days, setDays] = useState({
    M: props.days.monday,
    TU: props.days.tuesday,
    W: props.days.wednesday,
    TH: props.days.thursday,
    F: props.days.friday,
    SA: props.days.saturday,
    SU: props.days.sunday,
  });

  const [startTime, setStartTime] = useState(props.startTime);
  const [endTime, setEndTime] = useState(props.endTime);
  const [capacity, setCapacity] = useState(props.capacity);
  const [error, setError] = useState("");

  const editToggle = () => {
    setEditMode(!editMode);
  };

  function toggleCheckbox(day) {
    setDays((prevState) => ({
      ...prevState,
      [day]: !days[day],
    }));
  }

  async function fetchEditUrl(values) {
    const url = `${SERVER_URL}/restaurants/${props.restaurantId}/availability`;

    values = {
      M: days.M ? days.M : props.days.monday,
      TU: days.TU ? days.TU : props.days.tuesday,
      W: days.W ? days.W : props.days.wednesday,
      TH: days.TH ? days.TH : props.days.thursday,
      F: days.F ? days.F : props.days.friday,
      SA: days.SA ? days.SA : props.days.saturday,
      SU: days.M ? days.M : props.days.sunday,
      start_time: startTime ? startTime : props.startTime,
      end_time: endTime ? endTime : props.endTime,
      current_slots: capacity ? capacity : props.capacity,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseJson = await response.json();

      if (response.status === 400) {
        setError(responseJson.message);
      } else {
        setError("");
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = () => {
    fetchEditUrl();
  };

  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Start Time: </div>
            {editMode ? (
              <input
                onChange={(e) => setStartTime(e.target.value)}
                placeholder={props.startTime}
                type="time"
              ></input>
            ) : (
              <div className="table-cell">
                {startTime ? startTime : props.startTime}
              </div>
            )}
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">End Time: </div>
            {editMode ? (
              <input
                onChange={(e) => setEndTime(e.target.value)}
                placeholder={props.endTime}
                type="time"
              ></input>
            ) : (
              <div className="table-cell">
                {endTime ? endTime : props.endTime}
              </div>
            )}
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Capacity: </div>
            {editMode ? (
              <input
                onChange={(e) => setCapacity(e.target.value)}
                placeholder={props.capacity}
              ></input>
            ) : (
              <div className="table-cell">
                {capacity ? capacity : props.capacity}
              </div>
            )}
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
            {editMode ? (
              <tr>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("M")}
                    checked={days.M ? days.M : props.days.monday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("TU")}
                    checked={days.TU ? days.TU : props.days.tuesday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("W")}
                    checked={days.W ? days.W : props.days.wednesday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("TH")}
                    checked={days.TH ? days.TH : props.days.thursday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("F")}
                    checked={days.F ? days.F : props.days.friday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("SA")}
                    checked={days.SA ? days.SA : props.days.saturday}
                  ></input>
                </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox("SU")}
                    checked={days.SU ? days.SU : props.days.sunday}
                  ></input>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  {(days.M ? days.M : props.days.monday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.TU ? days.TU : props.days.tuesday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.W ? days.W : props.days.wednesday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.TH ? days.TH : props.days.thursday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.F ? days.F : props.days.friday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.SA ? days.SA : props.days.saturday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
                <td>
                  {(days.SU ? days.SU : props.days.sunday) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#x2717;</span>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editMode ? (
        <div>
          <button
            onClick={handleEdit}
            className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full "
          >
            Save
          </button>
          <button
            onClick={editToggle}
            className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full "
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={editToggle}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full "
        >
          Edit
        </button>
      )}
      <div className="text-red-500">{error}</div>
    </div>
  );
}

export default AddressTab;
