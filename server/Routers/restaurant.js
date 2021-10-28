var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
const { route } = require("./users");
router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

//Get all data regarding both restaurant details and corresponding addresses
router.get("/", async function (req, res) {
  const client = await pool.connect();
  try {
    const allRestaurantData = await client.query("SELECT * FROM restaurants JOIN addresses ON restaurants.address_id = addresses.uuid");
    res.status(200).json({ restaurants: allRestaurantData });
  } catch {
    res.status(400).json({ message: "Failed to fetch all restaurants" });
  }
  client.release();
});

//Get all addresses from each restaurant
router.get("/addresses", async function (req, res) {
  const client = await pool.connect();
  try {
    const restaurantAddresses = await client.query("SELECT * FROM addresses");
    res.status(200).json({ addresses: restaurantAddresses });
  } catch {
    res.status(400).json({ message: "Failed to fetch all restaurant addresses" });
  }
  client.release();
});

//Get all restaurant details
router.get("/restaurants", async function (req, res) {
  const client = await pool.connect();
  try {
    const restaurantAddresses = await client.query("SELECT * FROM addresses");
    res.status(200).json({ addresses: restaurantAddresses });
  } catch {
    res.status(400).json({ message: "Failed to fetch all restaurant addresses" });
  }
  client.release();
});

//Get desired restaurant
router.get("/:id", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    const restaurantDetails = await client.query(
      "SELECT * FROM restaurants JOIN addresses ON restaurants.address_id = addresses.uuid WHERE restaurants.id = $1",
      [id]
    );
    res.status(200).json({ restaurant: restaurantDetails });
  } catch {
    res.status(400).json({ message: "Failed to fetch restaurant" });
  }
  client.release();
});

//Get all past orders for the restaurant
router.get("/:id/orders", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    await client.query("SELECT * FROM orders WHERE restaurant_id = $1 ", [id]);
    res.status(200).json({ message: "Success! Fetched all past orders" });
  } catch {
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Gets all restaurant orders for the day
router.get("/:id/orders/today", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    await client.query("SELECT * FROM orders WHERE restaurant_id = $1 AND (CURRENT_TIMESTAMP::date = created_at::date)", [id]);
    res.status(200).json({ message: "Success! Fetched all orders for the day." });
  } catch {
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Update restaurants details
router.put("/:id/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { name, telephone, description, start_time, end_time, available_days, current_slots, street_name, postcode, town } = req.body;

  try {
    await client.query(
      "UPDATE restaurants SET name = $1, telephone = $2, description = $3, start_time =$4, end_time = $5, available_days = $6, current_slots = $7 WHERE id = $8",
      [name, telephone, description, start_time, end_time, available_days, current_slots, id]
    );
    await client.query("UPDATE addresses SET streetname = $1, postcode = $2, town = $3 WHERE uuid = $4", [street_name, postcode, town]);
    res.status(200).json({ message: "Your account details have been updated!" });
  } catch {
    res.status(400).json({ message: "Failed to update account details." });
  }

  client.release();
});

router.post("/", async function (req, res) {
  const client = await pool.connect();
  ////////UPDATE SO THAT USER_ID GRABS FROM SESSIONS//////////
  const user_id = await client.query(`SELECT user_id FROM sessions`);
  const user_id_value = user_id.rows[0].user_id;
  const { firstCountry, secondCountry, indicator } = await req.body;
  console.log(user_id_value, firstCountry, secondCountry, indicator);
  try {
    await client.query("INSERT INTO history (user_id, country1_id,country2_id,indicator_id) VALUES ($1, $2,$3,$4)", [
      user_id_value,
      firstCountry,
      secondCountry,
      indicator,
    ]);
    res.status(200).json({ Message: "History updated!" }, 200);
  } catch {
    res.status(400).json({ Message: "Error" }, 400);
  }

  client.release();
});

module.exports = router;
