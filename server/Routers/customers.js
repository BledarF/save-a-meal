var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const { Pool, Client } = require("pg");
router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

//Make a order

router.post("/:customer_id/restaurant/:restaurant_id/order", async function (req, res) {
  const client = await pool.connect();
  const { customer_id, restaurant_id } = req.params;

  try {
    await client.query(`INSERT INTO orders(customer_id, restaurant_id,collected) VALUES($1, $2, $3)`, [customer_id, restaurant_id, false]);
    await client.query(`UPDATE restaurants SET current_slots = current_slots - 1 WHERE id = $1`, [restaurant_id]);
    res.status(200).json({ message: "Order successfully submitted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Order failed to be submitted" });
  }
});

//Gets customer order for the day
router.get("/:id/orders/today", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const customersOrder = await client.query(
      "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurants.id WHERE customer_id = $1 AND (CURRENT_TIMESTAMP::date = created_at::date)",
      [id]
    );
    console.log(customersOrder);
    res.status(200).json({ order: customersOrder.rows, message: "Success! Fetched all orders for the day." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Get all past customer orders

router.get("/:id/orders", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const orderHistory = await client.query(
      "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurants.id WHERE customer_id = $1 ",
      [id]
    );

    res.status(200).json({ orderHistory: orderHistory.rows, message: "Success! Fetched all past orders" });
  } catch {
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Update details

router.put("/:id/all/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { id, uuid } = req.params;
  const { firstname, secondname, telephone, streetname, postcode, town } = req.body;

  try {
    await client.query("UPDATE customers SET firstname = $1, secondname = $2, telephone = $3 WHERE id = $4", [firstname, secondname, telephone, id]);
    await client.query("UPDATE addresses SET streetname = $1, postcode = $2, town = $3 WHERE uuid = $4", [streetname, postcode, town, uuid]);

    res.status(200).json({ message: "All account details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update account details." });
  }

  client.release();
});

//Update customers' login details
router.put("/:id/login", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    await client.query("UPDATE users SET email = $1 , password = $2 WHERE customer_id = $3", [email, password, id]);
    res.status(200).json({ message: "Your login details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update login details" });
  }
});

//Update customers' address
router.put("/:id/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { uuid } = req.params;
  const { streetname, postcode, town } = req.body;

  try {
    await client.query("UPDATE addresses SET streetname = $1 , postcode = $2, town = $3 WHERE uuid = $4", [streetname, postcode, town, uuid]);
    res.status(200).json({ message: "Your address details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update address details" });
  }
});

//Update customers' personal details
router.put("/:id/details", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { firstname, secondname, telephone } = req.body;

  try {
    await client.query("UPDATE customers SET firstname = $1 , secondname = $2, telephone = $3 WHERE id = $4", [firstname, secondname, telephone, id]);
    res.status(200).json({ message: "Your personal details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update personal details" });
  }
});

module.exports = router;
