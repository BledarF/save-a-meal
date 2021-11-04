import { tr } from "date-fns/locale";
import React, { useState } from "react";
import AcceptOrderModal from "./AcceptOrderModel";

function BusinessOrderEntry(props) {
  const [showAcceptOrders, setShowAcceptOrders] = useState(false);

  function acceptBut() {
    return (
      <button
        onClick={() => {
          setShowAcceptOrders(true);
        }}
        class="px-4 py-1 text-sm text-white bg-yellow-500 rounded"
      >
        Accept
      </button>
    );
  }

  function acceptedStatus() {
    return (
      <button
        href="#"
        class="px-3 py-1 text-sm text-white bg-green-500 rounded"
      >
        Accepted
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
        <div class="text-sm text-gray-500">{props.telephone}</div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-500">{props.date}</td>
      <td class="px-8 py-4">
        {props.collected ? acceptedStatus() : acceptBut()}
      </td>
      {showAcceptOrders ? (
        <AcceptOrderModal
          setShowModal={setShowAcceptOrders}
          handleAccept={props.handleAccept}
          id={props.id}
          firstName={props.name}
          secondName={props.secondName}
        ></AcceptOrderModal>
      ) : null}
    </tr>
  );
}

export default BusinessOrderEntry;
