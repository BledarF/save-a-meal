import { useEffect, useContext, useState } from "react";
import UserAccount from "./userAccount";
import BusinessAccount from "./BusinessAccount";

function Account() {
  return (
    <>
      <div className="flex justify-center">
        <BusinessAccount></BusinessAccount>
      </div>
    </>
  );
}

export default Account;
