import React, { useState } from "react";

function AccountTab(props) {
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [telephone, setTelephone] = useState(props.telephone);
  const [error, setError] = useState("");

  const editToggle = () => {
    setEditMode(!editMode);
  };

  async function fetchEditUrl(url) {
    const values = {
      email: email ? email : props.email,
      password: password ? password : props.password,
      telephone: telephone ? telephone : props.telephone,
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
    if (props.restaurantId) {
      fetchEditUrl(`/api/restaurants/${props.restaurantId}/account`);
    } else if (props.customerId) {
      fetchEditUrl(`/api/customers/${props.customerId}/account`);
    }
  };

  return (
    <div>
      <div className="table w-full text-left pl-14">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell pb-1">Email: </div>
            {editMode ? (
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder={props.email}
              ></input>
            ) : (
              <div className="table-cell">{email ? email : props.email}</div>
            )}
          </div>
          <div class="table-row">
            <div class="table-cell pb-1">Telephone: </div>
            {editMode ? (
              <input
                type="tel"
                onChange={(e) => setTelephone(e.target.value)}
                placeholder={props.telephone}
              ></input>
            ) : (
              <div className="table-cell">
                {telephone ? telephone : props.telephone}
              </div>
            )}
          </div>
          <div className="table-row">
            <div className="table-cell pb-1">Password: </div>
            {editMode ? (
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Enter new password"}
              ></input>
            ) : (
              <div className="table-cell">****************</div>
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

export default AccountTab;
