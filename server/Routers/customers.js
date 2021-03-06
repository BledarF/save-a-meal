var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Pool, Client } = require("pg");
router.use(cookieParser());

const pool = new Pool({
  connectionString:
    process.env.POSTGRES || "postgres://localhost:5432/saveameal",
});

//Make a order

router.post(
  "/:user_id/restaurant/:restaurant_id/order",
  async function (req, res) {
    const client = await pool.connect();
    const { user_id, restaurant_id } = req.params;
    const booking_id = (Math.random() + 1)
      .toString(36)
      .substring(4)
      .toUpperCase();

    try {
      const customer_id_value = await client.query(
        `SELECT customer_id FROM users WHERE id=$1 `,
        [user_id]
      );
      // console.log(customer_id_value);
      const customer_id = customer_id_value.rows[0].customer_id;
      await client.query(
        `INSERT INTO orders(customer_id, restaurant_id,collected,booking_id) VALUES($1, $2, $3,$4)`,
        [customer_id, restaurant_id, false, booking_id]
      );
      await client.query(
        `UPDATE restaurants SET current_slots = current_slots - 1 WHERE id = $1`,
        [restaurant_id]
      );
      res.status(200).json({
        message: "Order successfully submitted!",
        booking_id: booking_id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Order failed to be submitted" });
    }
  }
);

//Gets customer order for the day
router.get("/:id/orders/today", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const customersOrder = await client.query(
      "SELECT orders.collected, orders.id AS orderid, orders.booking_id, reviews.id AS reviewsid, restaurants.*, addresses.* FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurants.id  JOIN addresses ON restaurants.address_id = addresses.uuid FULL JOIN reviews ON orders.id = reviews.order_id WHERE customer_id = $1 AND (CURRENT_TIMESTAMP::date = created_at::date)",
      [id]
    );

    customersOrder.rows.map((order) => {
      if (order.reviewsid === null) {
        order.reviewed = false;
        return order;
      } else {
        order.reviewed = true;
        return order;
      }
    });

    res.status(200).json({
      order: customersOrder.rows,
      message: "Success! Fetched all orders for the day.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }

  client.release();
});

//Get all past customer orders

router.get("/:id/orders", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const orderHistory = await client.query(
      "SELECT orders.created_at, orders.collected, orders.id AS orderid, orders.booking_id, reviews.id AS reviewsid, restaurants.* FROM orders JOIN customers ON orders.customer_id = customers.id JOIN restaurants ON orders.restaurant_id = restaurants.id LEFT JOIN reviews ON orders.id = reviews.order_id WHERE customer_id = $1 AND (CURRENT_TIMESTAMP::date != created_at::date) ",

      [id]
    );

    orderHistory.rows.map((order) => {
      if (order.reviewsid === null) {
        order.reviewed = false;
        return order;
      } else {
        order.reviewed = true;
        return order;
      }
    });

    console.log(orderHistory.rows);

    res.status(200).json({
      order: orderHistory.rows,
      message: "Success! Fetched all past orders",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch orders for the day." });
  }

  client.release();
});

//Make a review

router.post(
  "/reviews/restaurant/:restaurant_id/order/:order_id/",
  async function (req, res) {
    const client = await pool.connect();
    const { restaurant_id, order_id } = req.params;
    const { values } = req.body;

    const score = values.score;

    try {
      const reviewCheck = await client.query(
        "SELECT * FROM reviews WHERE order_id = $1 ",
        [order_id]
      );

      console.log(reviewCheck.rows);

      if (reviewCheck.rows.length === 0) {
        await client.query(
          "INSERT INTO reviews(score,order_id,restaurant_id) VALUES($1,$2,$3) ",
          [score, order_id, restaurant_id]
        );
        res.status(200).json({ message: "Review successfully submitted!" });
      } else {
        res.status(400).json({
          message: "Review has already been submitted for this order.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Failed to insert review" });
    }
  }
);

//Update all customers details

router.put("/:id/all/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { id, uuid } = req.params;
  const { firstname, secondname, telephone, streetname, postcode, town } =
    req.body;
  const activeSession = await req.cookies.sessionID;

  try {
    if (checkValidUser(client, activeSession)) {
      await client.query(
        "UPDATE customers SET firstname = $1, secondname = $2, telephone = $3 WHERE id = $4",
        [firstname, secondname, telephone, id]
      );
      await client.query(
        "UPDATE addresses SET streetname = $1, postcode = $2, town = $3 WHERE uuid = $4",
        [streetname, postcode, town, uuid]
      );

      res
        .status(200)
        .json({ message: "All account details have been updated!" });
    } else {
      res.status(400).json({ message: "Request made by unauthorised user" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update account details." });
  }

  client.release();
});

//Update customers' account details
router.put("/:id/account", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { email, telephone, password } = req.body;
  const activeSession = await req.cookies.sessionID;

  console.log(req.body);

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Email is invalid. Please try again." });
  } else if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    return res.status(400).json({ message: "Password is invalid" });
  } else if (!validator.isMobilePhone(telephone)) {
    return res.status(400).json({ message: "Phone is invalid" });
  } else {
    try {
      if (checkValidUser(user, activeSession)) {
        await client.query(
          "UPDATE users SET email = $1 , password = $2 WHERE customer_id = $3",
          [email, password, id]
        );
        await client.query(
          "UPDATE customers SET telephone = $1 WHERE customers.id = $2",
          [telephone, id]
        );
        res
          .status(200)
          .json({ message: "Your login details have been updated!" });
      } else {
        res.status(400).json({ message: "Request sent by unauthorised user." });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Failed to update login details" });
    }
  }

  client.release();
});

//Update customers' address
router.put("/:id/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { uuid } = req.params;
  const { streetname, postcode, town } = req.body;
  const activeSession = await req.cookies.sessionID;

  try {
    if (checkValidUser(user, activeSession)) {
      await client.query(
        "UPDATE addresses SET streetname = $1 , postcode = $2, town = $3 WHERE uuid = $4",
        [streetname, postcode, town, uuid]
      );
      res
        .status(200)
        .json({ message: "Your address details have been updated!" });
    } else {
      res.status(400).json({ message: "Request made by unauthorised user." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update address details" });
  }

  client.release();
});

//Update customers' personal details
router.put("/:id/details", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  const { firstname, secondname, telephone } = req.body;
  const activeSession = await req.cookies.sessionID;

  try {
    if (checkValidUser(user, activeSession)) {
      await client.query(
        "UPDATE customers SET firstname = $1 , secondname = $2, telephone = $3 WHERE id = $4",
        [firstname, secondname, telephone, id]
      );
      res
        .status(200)
        .json({ message: "Your personal details have been updated!" });
    } else {
      res.status(400).json({ message: "Request made by unauthorised user " });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update personal details" });
  }

  client.release;
});

async function checkValidUser(client, activeSession) {
  const checkUser = await client.query(
    "SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE uuid = $1",
    [activeSession]
  );

  if (checkUser.rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
