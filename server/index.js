const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const users = require("./Routers/users");
const sessions = require("./Routers/sessions");
const restaurant = require("./Routers/restaurant");

const PORT = process.env.PORT || 8080;
const POSTGRES_URL =
	process.env.POSTGRES || "postgres://localhost:5432/saveameal";

const { Pool, Client } = require("pg");

const pool = new Pool({
	connectionString: POSTGRES_URL,
});

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.use("/api/users", users);
app.use("/api/sessions", sessions);
app.use("/api/restaurant", restaurant);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
