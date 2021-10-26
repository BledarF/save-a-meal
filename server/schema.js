const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/saveameal");

async function createDatabase() {
  await client.connect();
  addSeedData();
  //   createAddressesTable();
  //   createCustomerTable();
  //   createUsersTable();
  //   createSessionsTable();
  //   createRestaurantsTable();
  //   createOrdersTable();

  return;
}

async function createCustomerTable() {
  const sql = `
  CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  secondName TEXT NOT NULL,
address_id INTEGER REFERENCES addresses(uuid)
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
  restaurant_id INTEGER REFERENCES restaurants(id),
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

async function addSeedData() {
  const sql1 = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES(1121,'10 Downing Street', 'SW1A 2AA', 'Barbican')`;
  const sql2 = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES(1122,'152 Waterloo Rd ', 'SE1 7AA', 'Waterloo')`;
  const sql3 = `INSERT INTO addresses(uuid,streetname,postcode,town) VALUES(1123,'42 Silicon Rd', 'IG11 9UW', 'Barking')`;
  const sql4 = `INSERT INTO customers(firstname,secondname,address_id )VALUES('Bledar','Ferati',1123)`;
  const sql5 = `INSERT INTO restaurants(name,address_id,telephone,description,start_time,end_time,available_days,current_slots) VALUES('Pret Waterloo',1122,999,'We are a coffee shop that sells a variety of different pastries,coffee drinks and sandwiches. We sell vegan,halal and gluten-free food' , '17:35:00', '18:00:00', 12345, 10)`;
  const sql6 = `INSERT INTO restaurants(name,address_id,telephone,description,start_time,end_time,available_days,current_slots) VALUES('Kfc Liverpool Street',1121,911,'We are a fast food restaurant which sells high quality fried chicken.' , '19:40:00',' 20:00:00', 1234567, 8)`;
  const sql7 = `INSERT INTO users(username,email,password,customer_id) VALUES('BledarF','BledarF@hotmail.com','thisismypassword',1)`;
  const sql8 = `INSERT INTO users(username,email,password,restaurant_id )VALUES('PretBarbican','PretBarbican@hotmail.com','thisismypassword',1)`;
  const sql9 = `INSERT INTO users(username,email,password,restaurant_id )VALUES('KFCWaterloo','PretWaterloo@hotmail.com','thisismypassword',2)`;

  try {
    await client.query(sql1);
    await client.query(sql2);
    await client.query(sql3);
    await client.query(sql4);
    await client.query(sql5);
    await client.query(sql6);
    await client.query(sql7);
    await client.query(sql8);
    await client.query(sql9);

    console.log("Data Seeded");
    return;
  } catch (err) {
    console.log(err);
    console.log("Data failed to seed");
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
    uuid INTEGER NOT NULL PRIMARY KEY ,
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
    address_id INTEGER REFERENCES addresses(uuid),
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
