import React from "react";
//import BusinessOrderEntry from "./BusinessOrderEntry";
import CustomerOrderEntry from "./CustomerOrderEntry";

function TodayTable(props) {
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
                  <th className="px-6 py-2 text-xs text-gray-500">End time</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Postcode</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* Map an Orders State here... */}
                <CustomerOrderEntry></CustomerOrderEntry>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayTable;
