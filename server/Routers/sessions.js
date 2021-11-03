var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");

router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

router.post("/", async function (req, res) {
  const client = await pool.connect();
  const { email, password } = await req.body;
  const sessionID = uuidv4();
  const userKey = await client.query(`SELECT id FROM users WHERE email=$1`, [
    email,
  ]);

  try {
    await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
      sessionID,
      userKey.rows[0].id,
    ]);
    res.cookie("sessionID", sessionID);
    res.status(200).json({ message: "Successful login!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to login. Please try again." });
  }

  client.release();
});

router.get("/check", async function (req, res) {
  const client = await pool.connect();
  const activeSession = await req.cookies;
  const sessionID = await client.query(
    `SELECT user_id FROM sessions
              WHERE uuid=$1`,
    [activeSession.sessionID]
  );
  try {
    res.status(200).json({ id: sessionID.rows[0].user_id });
  } catch (error) {}
  client.release();
});

router.delete("/", async function (req, res) {
  const client = await pool.connect();
  const activeSession = await req.cookies;
  const cookieUUID = activeSession.sessionID;

  res
    .cookie("sessionID", cookieUUID, {
      expires: new Date(Date.now() - 900000),
      httpOnly: true,
    })
    .send("cookie updated");

  client.release();
});

module.exports = router;
