import React, { useEffect, useContext, useState } from "react";
import UserAccount from "./userAccount";
import BusinessAccount from "./BusinessAccount";
import { userContext } from "../../App";

function Account() {
  const { user, setUser } = useContext(userContext);

  async function fetchAccount() {
    console.log(user.id);
    try {
      const res = await fetch(`http://localhost:8080/api/users/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
    } catch {
      //alert("Error");
    }
  }

  React.useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <>
      <div className="flex justify-center">
        {/* ADD LOGIC HERE TO DETERMINE IF USER OR BUSINESS IS LOGGED IN */}
        <UserAccount></UserAccount>
      </div>
    </>
  );
}

export default Account;
