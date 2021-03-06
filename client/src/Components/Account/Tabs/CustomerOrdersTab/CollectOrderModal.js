import { useEffect, useState } from "react";

function CollectOrderModal(props) {
  const [error, setError] = useState("");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className=" pb-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold p-2 pl-3 pb-1 m-0">
                Collect order
              </h3>
              <button
                className="p-2 pr-5 pb-1"
                onClick={() => props.setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative py-1 px-36 flex-auto">
              <h6>Details of your collection are provided below:</h6>
              <div className="table w-full text-left pl-14">
                <div className="table-row-group">
                  <div className="table-row">
                    <div className="table-cell pb-1">Booking ID: </div>
                    <div className="table-cell">{props.id}</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell pb-1">Address: </div>
                    <div className="table-cell">{props.address.street}</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell pb-1">Town: </div>
                    <div className="table-cell">{props.address.town}</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell pb-1">Postcode: </div>
                    <div className="table-cell">{props.address.postcode}</div>
                  </div>
                </div>
              </div>
              <h6>Please go to the above address and show your booking ID. </h6>
            </div>
            {/*footer*/}
            <div className="flex justify-center">
              <div>
                <button
                  onClick={() => props.setShowModal(false)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded-full "
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default CollectOrderModal;
