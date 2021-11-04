import React from "react";

function BusinessOrderEntryHistory(props) {
  function handleAccept() {
    console.log("accept clicked");
  }

  function acceptBut() {
    return (
      <button class="px-4 py-1 text-sm text-white bg-red-500 rounded">
        Not Collected
      </button>
    );
  }

  function acceptedStatus() {
    return (
      <button
        href="#"
        class="px-3 py-1 text-sm text-white bg-green-500 rounded"
      >
        Collected
      </button>
    );
  }
  return (
    <tr class="whitespace-nowrap">
      <td class="px-6 py-4 text-sm text-gray-500">{props.id}</td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{props.name}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{props.date}</div>
      </td>
      <td class="px-8 py-4">
        {props.accepted ? acceptedStatus() : acceptBut()}
      </td>
    </tr>
  );
}

export default BusinessOrderEntryHistory;
