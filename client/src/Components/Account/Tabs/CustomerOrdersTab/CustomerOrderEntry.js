import React, { useState } from "react";
import CollectOrderModal from "./CollectOrderModal";

function CustomerOrderEntry(props) {
  const [showCollect, setShowCollect] = useState(false);

  function acceptBut() {
    return (
      <button
        onClick={() => {
          setShowCollect(true);
        }}
        href="#"
        class="px-4 py-1 text-sm text-white bg-yellow-500 rounded"
      >
        Collect
      </button>
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
      <td class="px-6 py-4 text-sm text-gray-500">{props.id}</td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{props.name}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{props.telephone}</div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-500">{props.startTime}</td>
      <td class="px-6 py-4 text-sm text-gray-500">{props.endTime}</td>
      <td class="px-8 py-4">
        {props.collected ? acceptedStatus() : acceptBut()}
      </td>
      {showCollect ? (
        <CollectOrderModal setShowModal={setShowCollect}></CollectOrderModal>
      ) : null}
    </tr>
  );
}

export default CustomerOrderEntry;
