import React from "react";
import BusinessOrderEntry from "./BusinessOrderEntry";

function TodayTable(props) {
  const orders = props.data.ordersToday;

  return (
    <div className="flex justify-start m-0">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="border-b border-gray-200 shadow">
            <table>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Telephone</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders &&
                  orders.map((order) => {
                    return order.customer_id ? (
                      <BusinessOrderEntry
                        id={order.booking_id}
                        name={order.firstname}
                        secondName={order.secondname}
                        telephone={order.telephone}
                        date={order.created_at}
                        collected={order.collected}
                        handleAccept={props.handleAccept}
                      ></BusinessOrderEntry>
                    ) : null;
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
