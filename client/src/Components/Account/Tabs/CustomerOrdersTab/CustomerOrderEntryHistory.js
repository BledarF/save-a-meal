import React from "react";

function CustomerOrderEntryHistory(props) {
  function acceptBut() {
    return (
      <a href="#" class="px-4 py-1 text-sm text-white bg-yellow-500 rounded">
        Accept
      </a>
    );
  }

  function acceptedStatus() {
    return (
      <a href="#" class="px-3 py-1 text-sm text-white bg-green-500 rounded">
        Accepted
      </a>
    );
  }
  return (
    <tr class="whitespace-nowrap">
      <td class="px-6 py-4 text-sm text-gray-500">1</td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">Jon doe</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">jhondoe@example.com</div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-500">2021-1-12</td>
      <td class="px-8 py-4">
        {props.accepted ? acceptedStatus() : acceptBut()}
      </td>
    </tr>
  );
}

export default CustomerOrderEntryHistory;
