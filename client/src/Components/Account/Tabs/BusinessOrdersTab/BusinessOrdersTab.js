import React, { useEffect, useState } from "react";
import AcceptOrderModal from "./AcceptOrderModel";
import HistoryTable from "./HistoryTable";
import TodayTable from "./TodayTable";

function BusinessOrdersTab(props) {
  const [todaysOrders, setTodaysOrders] = useState(null);
  const [historyOrders, setHistoryOrders] = useState(null);

  useEffect(() => {
    console.log(props.restaurantId);
    if (props.restaurantId) {
      getTodaysOrders();
      getHistoryOrders();
    }
  }, [props.restaurantId]);

  async function getTodaysOrders() {
    try {
      const response = await fetch(
        `/api/restaurants/${props.restaurantId}/orders/today`
      );

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setTodaysOrders(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  }

  async function getHistoryOrders() {
    try {
      const response = await fetch(
        `api/restaurants/${props.restaurantId}/orders/`
      );
      const jsonResponse = await response.json();
      console.log("HISTORY");
      console.log(jsonResponse);
      setHistoryOrders(jsonResponse);

      return jsonResponse;
    } catch (err) {
      console.log(err);
    }
  }

  function handleAccept(id) {
    alert("Order Colleted");
    getTodaysOrders();
    getHistoryOrders();
  }

  function getTodayTable(data) {
    return <TodayTable data={data} handleAccept={handleAccept}></TodayTable>;
  }

  function getHistoryTable(data) {
    return <HistoryTable data={data}></HistoryTable>;
  }

  return (
    <div className="flex flex-col text-left">
      <div>
        <h4>Today</h4>
        {todaysOrders ? getTodayTable(todaysOrders) : <p>No order Today</p>}
      </div>
      <div>
        <h4>History</h4>
        {historyOrders ? (
          getHistoryTable(historyOrders)
        ) : (
          <p> No past orders. </p>
        )}
      </div>
    </div>
  );
}

export default BusinessOrdersTab;
