import React, { useEffect } from "react";
import HistoryTable from "./HistoryTable";
import TodayTable from "./TodayTable";

function BusinessOrdersTab(props) {
  useEffect(() => {
    //FETCH ORDERS DATA
  }, []);

  async function getTodaysOrders() {
    try {
      const response = await fetch(`/api/restaurant/${props.restaurantId}/orders/today`);

      const jsonResponse = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  function getTodayTable() {
    return <TodayTable></TodayTable>;
  }

  function getHistoryTable() {
    return <HistoryTable></HistoryTable>;
  }

  return (
    <div className="flex flex-col text-left">
      <div>
        <h4>Today</h4>
        <p>No orders Today</p>
        {getTodayTable()}
      </div>
      <div>
        <h4>History</h4>
        <p>You have had no orders</p>
        {getHistoryTable()}
      </div>
    </div>
  );
}

export default BusinessOrdersTab;
