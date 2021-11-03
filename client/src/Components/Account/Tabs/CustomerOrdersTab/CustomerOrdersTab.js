import React, { useEffect, useState } from "react";
import HistoryTable from "./HistoryTable";
import TodayTable from "./TodayTable";

function CustomerOrdersTab(props) {
  const [todaysOrders, setTodaysOrders] = useState(null);

  useEffect(() => {
    console.log(props.customerId);
    if (props.customerId) {
      getTodaysOrders();
    }
  }, [props.customerId]);

  async function getTodaysOrders() {
    try {
      console.log(props.customerId);
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

  function getTodayTable(data) {
    return <TodayTable data={data}></TodayTable>;
  }

  function getHistoryTable() {
    return <HistoryTable></HistoryTable>;
  }

  return (
    <div className="flex flex-col text-left">
      <div>
        <h4>Today</h4>
        {todaysOrders ? getTodayTable(todaysOrders) : <p>No order Today</p>}
      </div>
      <div>
        <h4>History</h4>
        <p>You have had no orders</p>
        {getHistoryTable()}
      </div>
    </div>
  );
}

export default CustomerOrdersTab;
