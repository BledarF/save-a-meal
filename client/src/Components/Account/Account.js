import { useEffect, useContext, useState } from "react";
import UserAccount from "./userAccount";
import BusinessAccount from "./BusinessAccount";

function Account() {
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
