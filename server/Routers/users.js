var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const { Pool, Client, Query } = require("pg");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

router.post("/customer", async function (req, res) {
  const client = await pool.connect();
  const { email, password, firstName, lastName, streetname, postcode, town, telephone } = await req.body;
  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const duplicateSQL = `SELECT email FROM users WHERE email=$1`;
  const duplicate = await client.query(duplicateSQL, [email]);
  // console.log(duplicate.rows);
  try {
    if (duplicate.rows.length !== 0) {
      res.json(
        {
          Message: "This email is taken. Please try a different one or login.",
        },
        400
      );
    } else {
      const addressIDGen = crypto.randomInt(0, 1000000);
      // console.log(addressIDGen);
      const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;
      await client.query(addingAddressSQL, [addressIDGen, streetname, postcode, town]);
      const addingUserInfoSQL = `INSERT INTO customers (firstName,secondname,address_id,telephone) VALUES ($1,$2,$3,$4)`;
      await client.query(addingUserInfoSQL, [firstName, lastName, addressIDGen, telephone]);
      //
      const getUserId = `SELECT id FROM customers WHERE firstName=$1`;
      const userIdSQL = await client.query(getUserId, [firstName]);

      // console.log(userIdSQL);
      //////////////////////////////
      customer_id = userIdSQL.rows[0].id;
      // console.log(userIdSQL);
      const addingUsersSQL = `INSERT INTO users(password,email,customer_id) VALUES ($1,$2,$3)`;
      await client.query(addingUsersSQL, [passwordEncrypted, email, customer_id]);
      res.status(200).json({ Message: "User Created!" }, 200);
    }
  } catch (error) {
    res.status(400).json({ Message: error });
  }

  await client.release();
});

module.exports = router;

///
router.post("/restaurant", async function (req, res) {
  console.log(await req.body);
  const client = await pool.connect();
  const { name, streetname, postcode, town, telephone, description, startTime, endTime, current_slots, password, email, M, TU, W, TH, F, SA, SU } =
    await req.body;

  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const duplicateSQL = `SELECT email FROM users WHERE email=$1`;
  const duplicate = await client.query(duplicateSQL, [email]);
  const start_time_format = startTime + ":00";
  const end_time_format = endTime + ":00";
  try {
    if (duplicate.rows.length !== 0) {
      res.json(
        {
          Message: "This email is taken. Please try a different one or login.",
        },
        400
      );
    } else {
      const addressIDGen = crypto.randomInt(0, 1000000);
      const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;

      await client.query(addingAddressSQL, [addressIDGen, streetname, postcode, town]); ///////

      const addingUserInfoSQL = `INSERT INTO restaurants (name,address_id,telephone,description,start_time,end_time,current_slots) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      await client.query(addingUserInfoSQL, [name, addressIDGen, telephone, description, start_time_format, end_time_format, current_slots]);
      const getUserId = `SELECT id FROM restaurants WHERE address_id=$1`;
      const userIdSQL = await client.query(getUserId, [addressIDGen]);

      // console.log(userIdSQL);
      //////////////////////////////
      restaurant_id = userIdSQL.rows[0].id;
      const addingRestaurantSQL = `INSERT INTO users(password,email,restaurant_id) VALUES ($1,$2,$3)`;
      await client.query(addingRestaurantSQL, [passwordEncrypted, email, restaurant_id]);

      const addingAvailDays = `INSERT INTO available_days(restaurant_id,M,TU,W,TH,F,SA,SU) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
      await client.query(addingAvailDays, [restaurant_id, M, TU, W, TH, F, SA, SU]);

      res.status(200).json({ Message: "User Created!" }, 200);
    }
  } catch (error) {
    res.status(400).json({ Message: error });
  }
  client.release();
});

//Get account details for either restaurant or customer
router.get("/", async function (req, res) {
  console.log("string");
  const client = await pool.connect();

  const activeSession = await req.cookies.sessionID;
  console.log(activeSession);

  try {
    const checkUser = await client.query("SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE uuid = $1", [activeSession]);

    const id = checkUser.rows[0].id;
    console.log("here");

    if (checkUser.rows.length > 0) {
      if (checkUser.rows[0].restaurant_id) {
        const accountDetails = await client.query(
          "SELECT * FROM users JOIN restaurants ON users.restaurant_id  = restaurants.id JOIN addresses ON restaurants.address_id = addresses.uuid JOIN available_days ON available_days.restaurant_id = restaurants.id WHERE users.id = $1 ",
          [id]
        );
        res.status(200).json({ accountDetails: accountDetails.rows, type: "restaurant" });
      } else {
        console.log("we made it here now");
        console.log(id);
        const accountDetails = await client.query(
          "SELECT * FROM users JOIN customers ON users.customer_id  = customers.id JOIN addresses ON customers.address_id = addresses.uuid WHERE users.id = $1 ",
          [id]
        );
        // console.log(accountDetails);
        res.status(200).json({ accountDetails: accountDetails.rows, type: "customer" });
      }
    } else {
      res.status(400).json({ message: "Request was made from an unauthorised user." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch account details!" });
  }
  client.release();
});

router.post("/verify", async function (req, res) {
  const client = await pool.connect();
  const { password, email } = await req.body;
  const getPasswordSQL = `SELECT password FROM users WHERE email=$1`;
  const hash = await client.query(getPasswordSQL, [email]);
  try {
    const user_id_query = await client.query(`SELECT id FROM users WHERE email=$1`, [email]);
    // console.log(user_id_query.rows[0].id);
    if (hash.rows[0]) {
      const hashing = hash.rows[0].password;
      const result = await bcrypt.compare(password, hashing);
      if (result) {
        res.json({ status: "loggedIn", id: user_id_query.rows[0].id }, 200);
      } else {
        res.json({ status: "Incorrect password. Please try again" }, 400);
      }
    } else {
      res.json(
        {
          status: "Email does not exist. Please try again or register an account",
        },
        400
      );
    }
  } catch (err) {
    res.status(400).json({ Message: err });
  }
  client.release();
});
