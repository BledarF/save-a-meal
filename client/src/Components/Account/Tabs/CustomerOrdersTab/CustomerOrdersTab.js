import React, { useEffect, useState } from "react";
import HistoryTable from "./HistoryTable";
import TodayTable from "./TodayTable";

function CustomerOrdersTab(props) {
  const [todaysOrders, setTodaysOrders] = useState(null);
  const [historyOrders, setHistoryOrders] = useState(null);

  useEffect(() => {
    if (props.customerId) {
      getTodaysOrders();
      getHistoryOrders();
    }
  }, [props.customerId]);

  async function getTodaysOrders() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${props.customerId}/orders/today`
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setTodaysOrders(jsonResponse);

      return jsonResponse;
    } catch (err) {
      console.log(err);
    }
  }

  async function getHistoryOrders() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${props.customerId}/orders/`
      );
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      setHistoryOrders(jsonResponse);

      return jsonResponse;
    } catch (err) {
      console.log(err);
    }
  }

  function handleAccept() {
    getTodaysOrders();
    getHistoryOrders();
  }

  function getTodayTable(data) {
    return <TodayTable handleAccept={handleAccept} data={data}></TodayTable>;
  }

  function getHistoryTable(data) {
    return (
      <HistoryTable handleAccept={handleAccept} data={data}></HistoryTable>
    );
  }

  return (
    <div className="flex flex-col text-left">
      <div>
        <h4>Today</h4>
        {todaysOrders ? getTodayTable(todaysOrders) : <p>No order Today</p>}
      </div>
      <div>
        <h4>History</h4>
        {historyOrders && historyOrders.order.length > 0 ? (
          getHistoryTable(historyOrders)
        ) : (
          <p> No past orders. </p>
        )}
      </div>
    </div>
  );
}

export default CustomerOrdersTab;
