import React, { useEffect, useContext, useState } from "react";
import UserAccount from "./userAccount";
import BusinessAccount from "./BusinessAccount";
import { userContext } from "../../App";

function Account() {
  //const { accountDetails, setAccountDetails } = useState({});
  const [type, setType] = useState("");
  const [details, setDetails] = useState({});

  async function fetchAccount() {
    try {
      console.log("Fething");
      const res = await fetch(`http://localhost:8080/api/users/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(values),
      });
      console.log(res);
      const data = await res.json();
      console.log("API CALLED");
      console.log(data);
      setType(data.type);
      setDetails(data.accountDetails[0]);
    } catch {
      console.log("error");
    }
  }

  React.useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {/* ADD LOGIC HERE TO DETERMINE IF USER OR BUSINESS IS LOGGED IN */}
        {type && type === "customer" ? (
          <UserAccount accountDetails={details}></UserAccount>
        ) : (
          <BusinessAccount accountDetails={details}></BusinessAccount>
        )}
      </div>
    </>
  );
}

export default Account;
