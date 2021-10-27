var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
const { route } = require("./users");
router.use(cookieParser());

const pool = new Pool({
  connectionString: "postgres://localhost:5432/saveameal",
});

router.get("/", async function (req, res) {
  const client = await pool.connect();
  try {
    const restaurants = await client.query("SELECT * FROM restaurants");
    res.status(200).json({ restaurants: restaurants });
  } catch {
    res.status(400).json({ Message: "Failed to fetch all restaurants" });
  }
});

router.get("/:id", async function (req, res) {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    const restaurant = await client.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [id]
    );
    res.status(200).json({ restaurant: restaurant });
  } catch {
    res.status(400).json({ Message: "Failed to fetch restaurant" });
  }
});

router.put(':/id', async function (req,res) { 
	const client = await pool.connect()
	const {id} = req.params 

	try { 
		const 


	} catch { 


	}

})


router.post("/", async function (req, res) {
  const client = await pool.connect();
  ////////UPDATE SO THAT USER_ID GRABS FROM SESSIONS//////////
  const user_id = await client.query(`SELECT user_id FROM sessions`);
  const user_id_value = user_id.rows[0].user_id;
  const { firstCountry, secondCountry, indicator } = await req.body;
  console.log(user_id_value, firstCountry, secondCountry, indicator);
  try {
    await client.query(
      "INSERT INTO history (user_id, country1_id,country2_id,indicator_id) VALUES ($1, $2,$3,$4)",
      [user_id_value, firstCountry, secondCountry, indicator]
    );
    res.status(200).json({ Message: "History updated!" }, 200);
  } catch {
    res.status(400).json({ Message: "Error" }, 400);
  }

  client.release();
});

module.exports = router;
