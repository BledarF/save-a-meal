var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

//Make a order

router.post("/:customer_id/restaurant/:restaurant_id/order", async function (req, res) {
  const client = await pool.connect();
  const { customer_id, restaurant_id } = server.params;

  try {
    await client.query(`INSERT INTO orders(customer_id, restaurant_id) VALUES($1, $2)`, [customer_id, restaurant_id]);
    res.status(200).json({ message: "Order successfully submitted!" });
  } catch {
    res.status(400).json({ message: "Order failed to be submitted" });
  }
});

//Gets customer orders for the day (do this by joining customer,restaurant and order table based on id )
router.get("/:id/orders/today", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    await client.query(
      "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurant.id WHERE customer_id = $1 AND (CURRENT_TIMESTAMP::date = created_at::date)",
      [id]
    );
    res.status(200).json({ message: "Success! Fetched all orders for the day." });
  } catch {
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Get all past customer orders (do this by joining customer,restaurant and order table based on id )

router.get("/:id/orders", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    await client.query(
      "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurant.id WHERE customer_id = $1 ",
      [id]
    );
    res.status(200).json({ message: "Success! Fetched all past orders" });
  } catch {
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Update details

router.put("/:id/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { name, telephone, description, start_time, end_time, available_days, current_slots, street_name, postcode, town } = req.body;

  try {
    await client.query(
      "UPDATE customers SET name = $1, telephone = $2, description = $3, start_time =$4, end_time = $5, available_days = $6, current_slots = $7 WHERE id = $8",
      [name, telephone, description, start_time, end_time, available_days, current_slots, id]
    );
    await client.query("UPDATE addresses SET streetname = $1, postcode = $2, town = $3 WHERE uuid = $4", [street_name, postcode, town]);
    res.status(200).json({ message: "Your account details have been updated!" });
  } catch {
    res.status(400).json({ message: "Failed to update account details." });
  }

  client.release();
});

module.exports = router;
