var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.use(cookieParser());

const pool = new Pool({
	connectionString: "postgres://localhost:5432/saveameal",
});

router.post("/", async function (req, res) {
	const client = await pool.connect();
	const { username, password } = await req.body;
	const sessionID = uuidv4();
	const userKey = await client.query(`SELECT id FROM users WHERE username=$1`, [
		username,
	]);

	await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userKey.rows[0].id,
	]);

	res.cookie("sessionID", sessionID).send("cookie sent");

	client.release();
	console.log("released");
});

router.get("/", async function (req, res) {
	const client = await pool.connect();
	const activeSession = await req.cookies;
	const { user_id } = await req.body;
	const sessionID = await client.query(
		`SELECT uuid FROM sessions
              WHERE user_id=$1`,
		[user_id]
	);
	console.log(sessionID.rows[0]);
	console.log(activeSession);

	if (sessionID.rows[0]) {
		if (activeSession.sessionID === sessionID.rows[0].uuid) {
			res.json({ loggedIn: true });
			console.log("passes");
		} else {
			res.json({ loggedIn: false });
			console.log("fails 1");
		}
	} else {
		res.json({ loggedIn: false });
		console.log("fails 2");
	}

	client.release();
});

router.delete("/", async function (req, res) {
	const client = await pool.connect();
	const activeSession = await req.cookies;
	const cookieUUID = activeSession.sessionID;
	console.log(cookieUUID);
	try {
		await client.query(`DELETE FROM sessions WHERE uuid=$1`, [cookieUUID]);
		res.status(200).json({ Message: "Cookie Deleted!" }, 200);
	} catch {
		res.status(400).json({ Message: "Server Error" }, 400);
	}
	client.release();
});

module.exports = router;
