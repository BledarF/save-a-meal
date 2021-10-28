var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client, Query } = require("pg");
const { application, query } = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.use(cookieParser());

const pool = new Pool({
	connectionString: "postgres://localhost:5432/saveameal",
});

router.post("/customer", async function (req, res) {
	const client = await pool.connect();
	const {
		username,
		email,
		password,
		firstname,
		secondname,
		streetname,
		postcode,
		town,
	} = await req.body;
	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);
	const duplicateSQL = `SELECT username FROM users WHERE username=$1`;
	const duplicate = await client.query(duplicateSQL, [username]);
	// console.log(duplicate.rows);

	if (duplicate.rows.length !== 0) {
		res.json(
			{
				Message: "This username is taken. Please try a different one or login.",
			},
			400
		);
	} else {
		const addressIDGen = crypto.randomInt(0, 1000000);
		// console.log(addressIDGen);
		const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;
		await client.query(addingAddressSQL, [
			addressIDGen,
			streetname,
			postcode,
			town,
		]);
		const addingUserInfoSQL = `INSERT INTO customers (firstname,secondname,address_id) VALUES ($1,$2,$3)`;
		await client.query(addingUserInfoSQL, [
			firstname,
			secondname,
			addressIDGen,
		]);
		//
		const getUserId = `SELECT id FROM customers WHERE firstname=$1`;
		const userIdSQL = await client.query(getUserId, [firstname]);

		// console.log(userIdSQL);
		//////////////////////////////
		customer_id = userIdSQL.rows[0].id;
		// console.log(userIdSQL);
		const addingUsersSQL = `INSERT INTO users(username,password,email,customer_id) VALUES ($1,$2,$3,$4)`;
		await client.query(addingUsersSQL, [
			username,
			passwordEncrypted,
			email,
			customer_id,
		]);
		res.status(200).json({ Message: "User Created!" }, 200);
	}

	await client.release();
});

module.exports = router;

router.post("/verify", async function (req, res) {
	const client = await pool.connect();
	const { username, password, email } = await req.body;
	const getPasswordSQL = `SELECT password FROM users WHERE username=$1`;
	const hash = await client.query(getPasswordSQL, [username]);
	if (hash.rows[0]) {
		const hashing = hash.rows[0].password;
		const result = await bcrypt.compare(password, hashing);
		if (result) {
			res.json({ status: "loggedIn" }, 200);
		} else {
			res.json({ status: "Incorrect password. Please try again" }, 400);
		}
	} else {
		res.json(
			{
				status:
					"Username does not exist. Please try again or register an account",
			},
			400
		);
	}
	client.release();
});
///
router.post("/restaurant", async function (req, res) {
	console.log(await req.body);
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
		username,
		password,
		email,
		M,
		TU,
		W,
		TH,
		F,
		SA,
		SU,
	} = await req.body;

	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);
	const duplicateSQL = `SELECT username FROM users WHERE username=$1`;
	const duplicate = await client.query(duplicateSQL, [username]);
	const start_time_format = startTime + ":00";
	const end_time_format = endTime + ":00";

	if (duplicate.rows.length !== 0) {
		res.json(
			{
				Message: "This username is taken. Please try a different one or login.",
			},
			400
		);
	} else {
		const addressIDGen = crypto.randomInt(0, 1000000);
		const addingAddressSQL = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES ($1,$2,$3,$4)`;

		await client.query(addingAddressSQL, [
			addressIDGen,
			streetname,
			postcode,
			town,
		]); ///////

		const addingUserInfoSQL = `INSERT INTO restaurants (name,address_id,telephone,description,start_time,end_time,current_slots) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
		await client.query(addingUserInfoSQL, [
			name,
			addressIDGen,
			telephone,
			description,
			start_time_format,
			end_time_format,
			current_slots,
		]);
		const getUserId = `SELECT id FROM restaurants WHERE address_id=$1`;
		const userIdSQL = await client.query(getUserId, [addressIDGen]);

		// console.log(userIdSQL);
		//////////////////////////////
		restaurant_id = userIdSQL.rows[0].id;
		const addingRestaurantSQL = `INSERT INTO users(username,password,email,restaurant_id) VALUES ($1,$2,$3,$4)`;
		await client.query(addingRestaurantSQL, [
			username,
			passwordEncrypted,
			email,
			restaurant_id,
		]);

		const addingAvailDays = `INSERT INTO available_days(restaurant_id,M,TU,W,TH,F,SA,SU) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
		await client.query(addingAvailDays, [
			restaurant_id,
			M,
			TU,
			W,
			TH,
			F,
			SA,
			SU,
		]);

		res.status(200).json({ Message: "User Created!" }, 200);
	}
	await client.release();
});
