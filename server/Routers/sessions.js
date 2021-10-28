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

	await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userKey.rows[0].id,
	]);

	res.cookie("sessionID", sessionID).send("cookie sent");

	client.release();
	console.log("released");
});

router.get("/check", async function (req, res) {
	const client = await pool.connect();
	const activeSession = await req.cookies;
	const sessionID = await client.query(
		`SELECT user_id FROM sessions
              WHERE uuid=$1`,
		[activeSession.sessionID]
	);
	console.log(sessionID);
	res.status(200).json({ id: sessionID.rows[0].user_id });
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
