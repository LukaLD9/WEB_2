const { Pool } = require("pg");
var dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

console.log(isProduction)
console.log(connectionString);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionString: process.env.DB_URL,
  ssl: true
});

const drop_tables = `DROP TABLE IF EXISTS Csrf_users;`


const sql_create_csrf_users =
    `CREATE TABLE Csrf_users
    (
      IdUser INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      Username VARCHAR(255) NOT NULL,
      Password VARCHAR(255) NOT NULL
    );`

const sql_insert_csrf_users =
    `INSERT INTO Csrf_users(Username, Password) VALUES ('user', '12345678');`

let table_names = ['Csrf_users']

let tables = [sql_create_csrf_users]

let inserts = [sql_insert_csrf_users]

let indexes = []

if (
    tables.length !== inserts.length ||
    tables.length !== table_names.length
    ) {
    console.log("tables, names and data arrays length mismatch.");
    return;
}


//create tables and populate with data (if provided)

(async () => {
  console.log("Dropping tables");
  try {
    await pool.query(drop_tables, []);
    console.log("dropped all tables.");
  } catch (err) {
    console.log("Error could not drop all tables");
  }

    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
      console.log("Creating table " + table_names[i] + ".");
      console.log(tables[i]);
      try {
        await pool.query(tables[i], []);
        console.log("Table " + table_names[i] + " created.");
        if (inserts[i] !== undefined) {
          try {
            await pool.query(inserts[i], []);
            console.log("Table " + table_names[i] + " populated with data.");
          } catch (err) {
            console.log(
              "Error populating table " + table_names[i] + " with data."
            );
            return console.log(err.message);
          }
        }
      } catch (err) {
        console.log("Error creating table " + table_names[i]);
        return console.log(err.message);
      }
    }
  
    console.log("Creating indexes");
    for (let i = 0; i < indexes.length; i++) {
      try {
        await pool.query(indexes[i], []);
        console.log("Index " + i + " created.");
      } catch (err) {
        console.log("Error creating index " + i + ".");
      }
    }
  
    await pool.end();
  })();
