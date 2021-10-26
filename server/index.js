// server/index.js

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const POSTGRES_URL =
  process.env.POSTGRES || "postgres://localhost:5432/saveameal";

const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString: POSTGRES_URL,
});

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
