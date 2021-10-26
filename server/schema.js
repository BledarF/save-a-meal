const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/saveameal");

async function createDatabase() {
  await client.connect();
  createAddressesTable();
  createCustomerTable();
  createUsersTable();
  createSessionsTable();
  createRestaurantsTable();
  createOrdersTable();

  return;
}

async function createCustomerTable() {
  const sql = `
  CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  secondName TEXT NOT NULL,
address_id INTEGER REFERENCES addresses(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log("Customer table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Customer table issue");
    return;
  }
}

async function createUsersTable() {
  const sql = `
  CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE, 
  password TEXT NOT NULL,
  customer_id  INTEGER  REFERENCES customers(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  try {
    const res = await client.query(sql);
    console.log("Users table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Users table issue");
    return;
  }
}

async function createSessionsTable() {
  const sql = `
  CREATE TABLE sessions(
  uuid TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log("Sessions table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Sessions table issue");
    return;
  }
}

// async function addSeedData() {
//   const sql = `
//  INSERT INTO users(username, password) VALUES('test', 'test')`;

//   try {
//     const res = await client.query(sql);
//     console.log("Seed Data added");
//     return;
//   } catch (err) {
//     console.log(err);
//     console.log("Seed data issue");
//     return;
//   }
// }

async function createOrdersTable() {
  const sql = `
  CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    restaurant_id INTEGER REFERENCES restaurants(id) ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
  `;
  try {
    const res = await client.query(sql);
    console.log("Orders table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Orders table issue");
    return;
  }
}

async function createAddressesTable() {
  const sql = `
  CREATE TABLE addresses(
    id SERIAL PRIMARY KEY ,
    streetName TEXT NOT NULL,
    postCode TEXT NOT NULL,
    Town TEXT NOT NULL
  )
  `;
  try {
    const res = await client.query(sql);
    console.log("Addresses table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Addresses table issue");
    return;
  }
}

async function createRestaurantsTable() {
  const sql = `
  CREATE TABLE restaurants(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address_id INTEGER REFERENCES addresses(id),
    telephone INTEGER NOT NULL UNIQUE, 
    description TEXT NOT NULL,
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL, 
    available_days TEXT NOT NULL,
    current_slots INTEGER NOT NULL

  )
  `;
  try {
    const res = await client.query(sql);
    console.log("Restaurants table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Restaurants table issue");
    return;
  }
}

createDatabase();
