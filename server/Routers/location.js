// var express = require("express");
// var router = express.Router();
// var cookieParser = require("cookie-parser");
// var request = require("request");
// const https = require("https");
// const { Pool, Client } = require("pg");
// var deg2rad = require("deg2rad");
// const haversine = require("haversine");
// const { add } = require("date-fns");

// router.use(cookieParser());

// const pool = new Pool({
//   connectionString: "postgres://localhost:5432/saveameal",
// });

// async function run() {

// 	const client = await pool.connect();
// 	///OBTAINING POSTCODE OF RESTAURANTS FROM DATABASE////
// 	const postcodeObj = await client.query(
// 		"SELECT postcode FROM addresses JOIN restaurants ON addresses.uuid = restaurants.address_id"
// 	);
// 	const postcodeObjRows = postcodeObj.rows;
// 	let postcode = [];
// 	for (let i = 0; i < postcodeObjRows.length; i++) {
// 		postcode.push(postcodeObjRows[i].postcode);
// 	}

// 	let postcodeString = { postcodes: postcode };

// 	///MAKING FETCH REQUEST TO API TO GET LONG LAT OF EACH RESTAURANT////

// 	const locationApi = request(
// 		{
// 			url: "https://api.postcodes.io/postcodes",
// 			method: "POST",
// 			json: true, // <--Very important!!!
// 			body: postcodeString,
// 		},
// 		function (error, response, body) {
// 			// console.log(body);
// 			const result = body.result;
// 			let addressInfo = [];
// 			for (let i = 0; i < result.length; i++) {
// 				addressInfo.push({
// 					latitude: result[i].result.latitude,
// 					longitude: result[i].result.longitude,
// 				});
// 			}
// 			console.log(addressInfo);

// 			// console.log(haversine(points[0], points[1], { unit: "mile" }));
// 		}
// 	);

// 	// console.log(postcodeString);

// }

// run();

// router.post("/", async function (req, res) {
//   const client = await pool.connect();
// });
// module.exports = router;
