const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/saveameal");

//IF YOU WANT TO ADD OR EDIT OR DELETE A TABLE, DO THE FOLLOWING IN ORDER

//IN YOUR TERMINAL TYPE IN 'psql postgres' and then say the following:
//DROP DATABASE IF EXISTS saveameal WITH (FORCE);
//CREATE DATABASE saveameal;
//EXIT PSQL
//THEN RUN SCHEMA.JS

async function createDatabase() {
  await client.connect();
  createAddressesTable();
  createCustomerTable();
  createRestaurantsTable();
  createWeekDayTable();
  createUsersTable();
  createSessionsTable();
  createOrdersTable();
  createReviewsTable();
  addSeedData();

  return;
}

async function createReviewsTable() {
  const sql = `
  CREATE TABLE reviews(
  id SERIAL PRIMARY KEY,
  rating smallint NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  restaurant_id INTEGER REFERENCES restaurants(id),
  order_id INTEGER REFERENCES orders(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log("Reviews table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Reviews table issue");
    return;
  }
}

async function createCustomerTable() {
  const sql = `
  CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  secondName TEXT NOT NULL,
  telephone VARCHAR(15) NOT NULL UNIQUE,
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

  const sql4 = `INSERT INTO customers(firstname,secondname,address_id,telephone)VALUES('Bledar','Ferati',1123,07353532525)`;

  const pretW = `INSERT INTO restaurants(name,address_id,telephone,description,start_time,end_time,current_slots, imageURL, logoURL)
  			VALUES('Pret Waterloo',1122,999,'We are a coffee shop that sells a variety of different pastries,coffee drinks and sandwiches. We sell vegan,halal and gluten-free food' , '17:35:00', '18:00:00', 10, 'https://canarywharf.com/wp-content/uploads/2020/05/canary-wharf-eating-drinking-pret-a-manger-ss20-3-710x690-1.jpg', 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/54b77ad52314674bcae8118e43a73e85')`;
  const kfc = `INSERT INTO restaurants(name,address_id,telephone,description,start_time,end_time,current_slots, imageURL, logoURL)
  			VALUES('Kfc Liverpool Street',1121,911,'We are a fast food restaurant which sells high quality fried chicken.' , '19:40:00',' 20:00:00', 8, 'https://images.squaremeal.co.uk/cloud/article/9982/images/kfc-shortage---2--12082021120105_09092021013501.jpeg?w=1000', 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png')`;
  const macdees = `INSERT INTO restaurants(name,address_id,telephone,description,start_time,end_time,current_slots, imageURL, logoURL)
  			VALUES('McDonalds',453,111,'We are a fast food restaurant which sells poor quality food pls buy from us if you want to get fatfat :).' , '03:01:00',' 03:02:00', 100, 'https://images.barrons.com/im-269232?width=1280&size=1.33333333', 'https://cdn.iconscout.com/icon/free/png-256/mcdonalds-3384870-2822951.png')`;

  const sql7 = `INSERT INTO users(email,password,customer_id) VALUES('BledarF@hotmail.com','thisismypassword',1)`;
  const sql8 = `INSERT INTO users(email,password,restaurant_id )VALUES('PretBarbican@hotmail.com','thisismypassword',1)`;
  const sql9 = `INSERT INTO users(email,password,restaurant_id )VALUES('PretWaterloo@hotmail.com','thisismypassword',2)`;

  const sql10 = `INSERT INTO orders(customer_id,restaurant_id,collected,booking_id)VALUES(1,1,false,'UX5666')`;

  try {
    await client.query(sql1);
    await client.query(sql2);
    await client.query(sql3);
    await client.query(sql4);
    await client.query(pretW);
    await client.query(kfc);
    await client.query(macdees);
    await client.query(sql7);
    await client.query(sql8);
    await client.query(sql9);
    await client.query(sql10);

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

async function createWeekDayTable() {
  const sql = ` 
  CREATE TABLE available_days( 
    restaurant_id INTEGER REFERENCES restaurants(id),
    M BOOLEAN NOT NULL, 
    TU BOOLEAN NOT NULL, 
    W BOOLEAN NOT NULL, 
    TH BOOLEAN NOT NULL, 
    F BOOLEAN NOT NULL, 
    SA BOOLEAN NOT NULL, 
    SU BOOLEAN NOT NULL 

  )
  
  `;
  try {
    const res = await client.query(sql);
    console.log("available_days table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("available_days table issue");
    return;
  }
}

async function createOrdersTable() {
  const sql = `
  CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    restaurant_id INTEGER REFERENCES restaurants(id) ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    collected BOOLEAN NOT NULL,
    booking_id VARCHAR(10) NOT NULL
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
    Town TEXT NOT NULL,
    distance_from_post INTEGER 
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
    telephone VARCHAR(15) NOT NULL UNIQUE, 
    description TEXT NOT NULL,
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL, 
    current_slots INTEGER NOT NULL,
    imageURL TEXT ,
    logoURL TEXT

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
