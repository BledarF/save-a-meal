import React, { useState } from "react";

function AddressTab(props) {
  const [editMode, setEditMode] = useState(false);

  const [postcode, setPostcode] = useState(props.postcode);
  const [streetname, setStreetname] = useState(props.streetname);
  const [town, setTown] = useState(props.town);

  const [error, setError] = useState("");

  const editToggle = () => {
    setEditMode(!editMode);
  };

  async function fetchEditUrl(url) {
    const values = {
      postcode: postcode ? postcode : props.postcode,
      streetname: streetname ? streetname : props.streetname,
      town: town ? town : props.town,
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
    fetchEditUrl(`/api/users/address/${props.uuid}`);
  };

  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Postcode: </div>
            {editMode ? (
              <input
                onChange={(e) => setPostcode(e.target.value)}
                placeholder={props.postcode}
              ></input>
            ) : (
              <div className="table-cell">
                {postcode ? postcode : props.postcode}
              </div>
            )}
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Street: </div>
            {editMode ? (
              <input
                onChange={(e) => setStreetname(e.target.value)}
                placeholder={props.streetname}
              ></input>
            ) : (
              <div className="table-cell">
                {streetname ? streetname : props.streetname}
              </div>
            )}
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Town: </div>
            {editMode ? (
              <input
                onChange={(e) => setTown(e.target.value)}
                placeholder={props.town}
              ></input>
            ) : (
              <div className="table-cell">{town ? town : props.town}</div>
            )}
          </div>
        </div>
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
