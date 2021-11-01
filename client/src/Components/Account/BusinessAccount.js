import React from "react";
import AccountTab from "./Tabs/AccountTab";
import AddressTab from "./Tabs/AddressTab";
import AvailabilityTab from "./Tabs/AvailabilityTab";
import BusinessOrdersTab from "./Tabs/BusinessOrdersTab/BusinessOrdersTab";

const Tabs = ({ color, accountDetails }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap pt-20">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Account
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Address
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Orders
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Availability
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 ">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <AccountTab
                    restaurantId={accountDetails.restaurant_id}
                    email={accountDetails.email}
                    telephone={accountDetails.telephone}
                  ></AccountTab>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <AddressTab
                    uuid={accountDetails.uuid}
                    postcode={accountDetails.postcode}
                    streetname={accountDetails.streetname}
                    town={accountDetails.town}
                  ></AddressTab>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <BusinessOrdersTab restaurantId={accountDetails.restaurant_id}></BusinessOrdersTab>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <AvailabilityTab
                    restaurantId={accountDetails.restaurant_id}
                    startTime={accountDetails.start_time}
                    endTime={accountDetails.end_time}
                    capacity={accountDetails.current_slots}
                    days={{
                      monday: accountDetails.m,
                      tuesday: accountDetails.tu,
                      wednesday: accountDetails.w,
                      thursday: accountDetails.th,
                      friday: accountDetails.f,
                      saturday: accountDetails.sa,
                      sunday: accountDetails.su,
                    }}
                  ></AvailabilityTab>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender(props) {
  return (
    <>
      <Tabs accountDetails={props.accountDetails} color="yellow" />;
    </>
  );
}
