var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var request = require("request");
const https = require("https");
const { Pool, Client } = require("pg");
var deg2rad = require("deg2rad");

router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

async function run() {
  const client = await pool.connect();

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }

  const postcodeObj = await client.query("SELECT postcode FROM addresses JOIN restaurants ON addresses.uuid = restaurants.address_id");
  const postcodeObjRows = postcodeObj.rows;
  let postcode = [];
  for (let i = 0; i < postcodeObjRows.length; i++) {
    postcode.push(postcodeObjRows[i].postcode);
  }

  let postcodeString = { postcodes: postcode };
  const locationApi = request(
    {
      url: "https://api.postcodes.io/postcodes",
      method: "POST",
      json: true, // <--Very important!!!
      body: postcodeString,
    },
    function (error, response, body) {
      // console.log(body);
      const result = body.result;
      let addressInfo = [];
      for (let i = 0; i < result.length; i++) {
        addressInfo.push([result[i].result.longitude, result[i].result.latitude]);
      }
      // console.log(addressInfo);

      distance(addressInfo[0][1], addressInfo[0][0], addressInfo[1][1], addressInfo[1][0], "K");
    }
  );
}

run();

router.post("/", async function (req, res) {
  const client = await pool.connect();
});
module.exports = router;
