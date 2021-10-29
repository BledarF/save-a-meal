var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const { Pool, Client } = require("pg");
router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

//Get all data regarding both restaurant details and corresponding addresses
router.get("/", async function (req, res) {
  const client = await pool.connect();
  try {
    const allRestaurantData = await client.query(
      "SELECT * FROM restaurants JOIN addresses ON restaurants.address_id = addresses.uuid JOIN available_days ON restaurants.id = available_days.restaurant_id"
    );
    res.status(200).json({ restaurants: allRestaurantData.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch all restaurants" });
  }
  client.release();
});

//Get all addresses from each restaurant
router.get("/addresses", async function (req, res) {
  const client = await pool.connect();
  try {
    const restaurantAddresses = await client.query(
      "SELECT streetname,postcode,town FROM addresses JOIN restaurants ON addresses.uuid = restaurants.address_id "
    );
    res.status(200).json({ addresses: restaurantAddresses.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch all restaurant addresses" });
  }
  client.release();
});

//Get all  details from all restaurants (add proximity , restaurants that have available slots )
router.get("/details/search/:postcode", async function (req, res) {
  const client = await pool.connect();
  const today = new Date();
  const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  try {
    const restaurantDetails = await client.query("SELECT * FROM restaurants");
    const filteredRestaurantDetails = restaurantDetails.rows.map((restaurant) => {
      if (currentTime < restaurant.start_time || currentTime > restaurant.end_time || restaurant.current_slots === 0) {
        restaurant.available = false;
        return restaurant;
      } else {
        restaurant.available = true;
        return restaurant;
      }
    });

    res.status(200).json({ restaurantsData: filteredRestaurantDetails });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch all restaurant details" });
  }
  client.release();
});

//Get desired restaurant
router.get("/:id", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    const restaurantDetails = await client.query(
      "SELECT * FROM restaurants JOIN addresses ON restaurants.address_id = addresses.uuid JOIN available_days ON available_days.restaurant_id = restaurants.id WHERE restaurants.id = $1",
      [id]
    );
    res.status(200).json({ restaurant: restaurantDetails.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch restaurant" });
  }
  client.release();
});

//Get all past orders for the restaurant
router.get("/:id/orders", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const allRestaurantOrders = await client.query(
      "SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id WHERE orders.restaurant_id = $1 AND (CURRENT_TIMESTAMP::date != created_at::date)",
      [id]
    );
    res.status(200).json({
      allRestaurantOrders: allRestaurantOrders.rows,
      message: "Success! Fetched all past orders",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Gets all restaurant orders for the day
router.get("/:id/orders/today", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const restaurantOrdersToday = await client.query(
      "SELECT * FROM orders JOIN restaurants ON orders.restaurant_id = restaurants.id WHERE orders.restaurant_id = $1 AND (CURRENT_TIMESTAMP::date = created_at::date)",
      [id]
    );
    res.status(200).json({
      ordersToday: restaurantOrdersToday.rows,
      message: "Success! Fetched all orders for the day.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }
});

//Gets all user account details

router.get("/:user_id/account_details", async function (req, res) {
  const client = await pool.connect();
  const { user_id } = req.params;

  try {
    const accountDetails = await client.query(
      "SELECT * FROM users JOIN restaurants ON users.restaurant_id  = restaurants.id JOIN addresses ON restaurant.address_id = addresses.id WHERE users.id = $1 ",
      [user_id]
    );
    res.status(200).json({ accountDetails: accountDetails });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch restau" });
  }
});

//Update all restaurants details

router.put("/:id/all/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { id, uuid } = req.params;
  const {
    name,
    telephone,
    description,
    start_time,
    end_time,
    current_slots,
    imageURL,
    logoURL,
    street_name,
    postcode,
    town,
    M,
    TU,
    W,
    TH,
    F,
    SA,
    SU,
  } = req.body;

  try {
    await client.query(
      "UPDATE restaurants SET name = $1, telephone = $2, description = $3, start_time =$4, end_time = $5, current_slots = $6,imageURL = $7, logoURL = $8 WHERE id = $9",
      [name, telephone, description, start_time, end_time, current_slots, imageURL, logoURL, id]
    );
    await client.query("UPDATE addresses SET streetname = $1, postcode = $2, town = $3 WHERE uuid = $4", [street_name, postcode, town, uuid]);
    await client.query("UPDATE available_days SET m = $1, tu = $2, w = $3, th = $4, f = $5, sa = $6, su = $7 WHERE restaurant_id = $8", [
      M,
      TU,
      W,
      TH,
      F,
      SA,
      SU,
      id,
    ]);
    res.status(200).json({ message: "Your account details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update account details." });
  }

  client.release();
});

//Update restaurants' login details
router.put("/:id/login", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    await client.query("UPDATE users SET email = $1 , password = $2 WHERE restaurant_id = $3", [email, password, id]);
    res.status(200).json({ message: "Your login details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update login details" });
  }

  client.release();
});

//Update restaurants' address details
router.put("/:id/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { uuid } = req.params;
  const { street_name, postcode, town } = req.body;

  try {
    await client.query("UPDATE addresses SET streetname = $1 , postcode = $2, town = $3 WHERE uuid = $4", [street_name, postcode, town, uuid]);
    res.status(200).json({ message: "Your address details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update address details" });
  }
  client.release();
});

//Update restaurants' personal details
router.put("/:id/details", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { name, telephone, description, start_time, end_time, current_slots, imageURL, logoURL } = req.body;

  try {
    await client.query(
      "UPDATE restaurants SET name = $1 , telephone = $2, description= $3, start_time = $4, end_time = $5, current_slots = $6, imageURL =  $7 , logoURL = $8 WHERE id = $9",
      [name, telephone, description, start_time, end_time, current_slots, imageURL, logoURL, id]
    );
    res.status(200).json({ message: "Your personal details have been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update personal details" });
  }
  client.release();
});

//Update restaurants' availability
router.put("/:id/availability", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { M, TU, W, TH, F, SA, SU } = req.body;

  try {
    await client.query("UPDATE available_days SET M = $1, TU = $2, W = $3, TH = $4, F = $5, SA = $6, SU = $7 WHERE restaurant_id = $8", [
      M,
      TU,
      W,
      TH,
      F,
      SA,
      SU,
      id,
    ]);
    res.status(200).json({ message: "Your availability has been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update availability" });
  }
  client.release();
});

//Update all restaurants' current slots to 10 when midnight hits

router.put("/reset", async function (req, res) {
  const client = await pool.connect();
  const defaultCurrentSlots = 10;

  try {
    await client.query("UPDATE restaurants SET current_slots = $1", [defaultCurrentSlots]);
    res.status(200).json({ message: "All current slots have been reset back to 10!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to reset current slots." });
  }
});

//Mark order as collected once customer has collected it

router.put("/:restaurant_id/customer/:customer_id", async function (req, res) {
  const client = await pool.connect();
  const { restaurant_id, customer_id } = req.params;

  try {
    await client.query("UPDATE orders SET collected = $1 WHERE restaurant_id = $2 AND customer_id = $3", [true, restaurant_id, customer_id]);
    res.status(200).json({ message: "Order has been successfully collected" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Order has not be processed. Something has gone wrong!" });
  }
});

module.exports = router;