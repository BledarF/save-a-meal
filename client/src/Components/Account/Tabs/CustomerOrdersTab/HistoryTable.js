import React from "react";
//import BusinessOrderEntryHistory from "./BusinessOrderEntryHistory";
import CustomerOrderEntryHistory from "./CustomerOrderEntryHistory";

function HistoryTable(props) {
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
                  <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders &&
                  orders.map((order) => {
                    return (
                      <CustomerOrderEntryHistory
                        id={order.booking_id}
                        name={order.name}
                        telephone={order.telephone}
                        startTime={order.start_time}
                        createdAt={order.created_at}
                        endTime={order.end_time}
                        collected={order.collected}
                        reviewed={order.reviewed}
                        restaurantId={order.id}
                        orderId={order.orderid}
                        handleAccept={props.handleAccept}
                      ></CustomerOrderEntryHistory>
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

export default HistoryTable;
