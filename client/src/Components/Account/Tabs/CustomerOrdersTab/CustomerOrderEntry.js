import React, { useState } from "react";
import CollectOrderModal from "./CollectOrderModal";
import ReviewModal from "./ReviewModal";

function CustomerOrderEntry(props) {
  const [showCollect, setShowCollect] = useState(false);
  const [showReview, setShowReview] = useState(false);

  function acceptBut() {
    return (
      <button
        onClick={() => {
          setShowCollect(true);
        }}
        class="px-4 py-1 text-sm text-white bg-yellow-500 rounded"
      >
        Collect
      </button>
    );
  }

  function reviewBut() {
    return (
      <button
        onClick={() => {
          setShowReview(true);
        }}
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
      <td class="px-6 py-4 text-sm text-gray-500">{props.startTime}</td>
      <td class="px-6 py-4 text-sm text-gray-500">{props.endTime}</td>
      <td class="px-8 py-4">
        {props.collected
          ? props.reviewed
            ? acceptedStatus()
            : reviewBut()
          : acceptBut()}
      </td>
      {showCollect ? (
        <CollectOrderModal
          address={{
            postcode: props.postcode,
            street: props.street,
            town: props.town,
          }}
          id={props.id}
          setShowModal={setShowCollect}
        ></CollectOrderModal>
      ) : null}
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

export default CustomerOrderEntry;
