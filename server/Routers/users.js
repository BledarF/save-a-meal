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
  const {
    email,
    password,
    firstName,
    lastName,
    streetname,
    postcode,
    town,
    telephone,
  } = await req.body;
  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const duplicateSQL = `SELECT email FROM users WHERE email=$1`;
  const duplicate = await client.query(duplicateSQL, [email]);
  //console.log(duplicate.rows);

  if (duplicate.rows.length !== 0) {
    res.json(
      {
        message: "This email is taken. Please try a different one or login.",
      },
      400
    );
    await client.release();
    return;
  }
  const addressIDGen = crypto.randomInt(0, 1000000);
  try {
    // console.log(addressIDGen);
    const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;
    await client.query(addingAddressSQL, [
      addressIDGen,
      streetname,
      postcode,
      town,
    ]);
  } catch {
    res.status(400).json({ message: "Error with address." });
    await client.release();
    return;
  }

  const customerIDGen = crypto.randomInt(0, 1000000);
  try {
    const addingUserInfoSQL = `INSERT INTO customers (id,firstName,secondname,address_id,telephone) VALUES ($1,$2,$3,$4,$5)`;
    await client.query(addingUserInfoSQL, [
      customerIDGen,
      firstName,
      lastName,
      addressIDGen,
      telephone,
    ]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error: telephone is already taken" });
    await client.release();
    return;
  }

  try {
    const addingUsersSQL = `INSERT INTO users(password,email,customer_id) VALUES ($1,$2,$3)`;
    await client.query(addingUsersSQL, [
      passwordEncrypted,
      email,
      customerIDGen,
    ]);
    res.status(200).json({ message: "User Created!" });
  } catch {
    res.status(400).json({ message: "Something has gone wrong" });
  }

  await client.release();
});

module.exports = router;

//Create restaurant user
router.post("/restaurant", async function (req, res) {
  const client = await pool.connect();
  const {
    name,
    streetname,
    postcode,
    town,
    telephone,
    description,
    startTime,
    endTime,
    current_slots,
    password,
    email,
    M,
    TU,
    W,
    TH,
    F,
    SA,
    SU,
    logo_url,
    image_url,
  } = await req.body;

  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const duplicateSQL = `SELECT email FROM users WHERE email=$1`;
  const duplicate = await client.query(duplicateSQL, [email]);
  const start_time_format = startTime + ":00";
  const end_time_format = endTime + ":00";

  console.log(duplicate.rows);
  if (duplicate.rows.length !== 0) {
    console.log("HERE");
    res.status(400).json({
      message: "This email is taken. Please try a different one or login.",
    });
    client.release();
    return;
  }

  const addressIDGen = crypto.randomInt(0, 1000000);
  try {
    const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;
    await client.query(addingAddressSQL, [
      addressIDGen,
      streetname,
      postcode,
      town,
    ]);
  } catch {
    res.status(400).json({ message: "Error with address" });
    client.release();
    return;
  }

  const restaurantIDGen = crypto.randomInt(0, 1000000);
  try {
    const addingUserInfoSQL = `INSERT INTO restaurants (id,name,address_id,telephone,description,start_time,end_time,current_slots) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
    await client.query(addingUserInfoSQL, [
      restaurantIDGen,
      name,
      addressIDGen,
      telephone,
      description,
      start_time_format,
      end_time_format,
      current_slots,
    ]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error with telephone" });
    client.release();
    return;
  }

  try {
    const addingRestaurantSQL = `INSERT INTO users(password,email,restaurant_id) VALUES ($1,$2,$3)`;
    await client.query(addingRestaurantSQL, [
      passwordEncrypted,
      email,
      restaurantIDGen,
    ]);
  } catch {
    res.status(400).json({ message: "Error with adding the user" });
    client.release();
    return;
  }

  try {
    const addingAvailDays = `INSERT INTO available_days(restaurant_id,M,TU,W,TH,F,SA,SU) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
    await client.query(addingAvailDays, [
      restaurantIDGen,
      M,
      TU,
      W,
      TH,
      F,
      SA,
      SU,
    ]);
    res.status(200).json({ message: "User Created!" });
  } catch {
    res.status(400).json({ message: "Error with available days" });
  }

  client.release();
});

//Get account details for either restaurant or customer
router.get("/", async function (req, res) {
  console.log("string");
  const client = await pool.connect();

  const activeSession = await req.cookies.sessionID;

  try {
    const checkUser = await client.query(
      "SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE uuid = $1",
      [activeSession]
    );

    const id = checkUser.rows[0].id;
    console.log("here");

    if (checkUser.rows.length > 0) {
      if (checkUser.rows[0].restaurant_id) {
        const accountDetails = await client.query(
          "SELECT * FROM users JOIN restaurants ON users.restaurant_id  = restaurants.id JOIN addresses ON restaurants.address_id = addresses.uuid JOIN available_days ON available_days.restaurant_id = restaurants.id WHERE users.id = $1 ",
          [id]
        );
        res
          .status(200)
          .json({ accountDetails: accountDetails.rows, type: "restaurant" });
      } else {
        const accountDetails = await client.query(
          "SELECT * FROM users JOIN customers ON users.customer_id  = customers.id JOIN addresses ON customers.address_id = addresses.uuid WHERE users.id = $1 ",
          [id]
        );
        res
          .status(200)
          .json({ accountDetails: accountDetails.rows, type: "customer" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Request was made from an unauthorised user." });
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
    const user_id_query = await client.query(
      `SELECT id FROM users WHERE email=$1`,
      [email]
    );
    if (hash.rows[0]) {
      const hashing = hash.rows[0].password;
      const result = await bcrypt.compare(password, hashing);
      if (result) {
        res.json({ status: "loggedIn", id: user_id_query.rows[0].id }, 200);
      } else {
        res.json(
          {
            status: "Incorrect password. Please try again",
            message: "Incorrect Password",
          },
          400
        );
      }
    } else {
      res.json(
        {
          status:
            "Email does not exist. Please try again or register an account",
        },
        400
      );
    }
  } catch (err) {
    res.status(400).json({ Message: "Error with verification" });
  }
  client.release();
});

//Update address details
router.put("/address/:uuid", async function (req, res) {
  const client = await pool.connect();
  const { uuid } = req.params;
  const { streetname, postcode, town } = req.body;

  console.log(req.body);
  const postcodePattern =
    "^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$";
  if (!postcode.match(postcodePattern)) {
    res.status(400).json({ message: "Invalid Postcode" });
  } else {
    try {
      await client.query(
        "UPDATE addresses SET streetname = $1 , postcode = $2, town = $3 WHERE uuid = $4",
        [streetname, postcode, town, uuid]
      );
      res
        .status(200)
        .json({ message: "Your address details have been updated!" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Failed to update address details" });
    }
  }

  client.release();
});
