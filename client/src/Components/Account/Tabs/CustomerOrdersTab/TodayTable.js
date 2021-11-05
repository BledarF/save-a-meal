import React from "react";
//import BusinessOrderEntry from "./BusinessOrderEntry";
import CustomerOrderEntry from "./CustomerOrderEntry";

function TodayTable(props) {
  const orders = props.data.order;
  return (
    <div className="flex justify-start m-0">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="border-b border-gray-200 shadow">
            <table>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Location</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Telephone</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Start time
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">End time</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders &&
                  orders.map((order) => {
                    return (
                      <CustomerOrderEntry
                        id={order.booking_id}
                        name={order.name}
                        telephone={order.telephone}
                        startTime={order.start_time}
                        endTime={order.end_time}
                        collected={order.collected}
                        postcode={order.postcode}
                        town={order.town}
                        street={order.streetname}
                        reviewed={order.reviewed}
                        restaurantId={order.id}
                        orderId={order.orderid}
                        handleAccept={props.handleAccept}
                      ></CustomerOrderEntry>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayTable;
