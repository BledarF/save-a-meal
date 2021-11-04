import React, { useState } from "react";
import ReviewModal from "./ReviewModal";

function CustomerOrderEntryHistory(props) {
  const [showReview, setShowReview] = useState(false);
  function acceptBut() {
    return (
      <a href="#" class="px-4 py-1 text-sm text-white bg-yellow-500 rounded">
        Review
      </a>
    );
  }

  function reviewBut() {
    return (
      <button
        onClick={() => setShowReview(true)}
        class="px-4 py-1 text-sm text-white bg-yellow-500 rounded"
      >
        Review
      </button>
    );
  }

  function acceptedStatus() {
    return (
      <a href="#" class="px-3 py-1 text-sm text-white bg-green-500 rounded">
        Reviewed
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
      <td class="px-6 py-4 text-sm text-gray-500">{props.createdAt}</td>
      <td class="px-8 py-4">
        {props.reviewed ? acceptedStatus() : reviewBut()}
      </td>
      {showReview ? (
        <ReviewModal
          restaurantId={props.restaurantId}
          orderId={props.orderId}
          setShowModal={setShowReview}
          handleAccept={props.handleAccept}
        ></ReviewModal>
      ) : null}
    </tr>
  );
}

export default CustomerOrderEntryHistory;
