const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "competition",
  password: "postgres",
  port: 5432,
});

const drop_tables =
`DROP SCHEMA public CASCADE;
CREATE SCHEMA public;`

const sql_create_userinfo =
    `CREATE TABLE Users
    (
      IdUser VARCHAR(255) NOT NULL,
      PRIMARY KEY (IdUser)
    );`

const sql_create_competition =
    `CREATE TABLE Competition
    (
      Name VARCHAR(255) NOT NULL,
      IdCompetition INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      System VARCHAR(16) NOT NULL,
      IdUser VARCHAR(255) NOT NULL,
      FOREIGN KEY (IdUser) REFERENCES Users(IdUser)
    );`

const sql_create_competitor =
    `CREATE TABLE Competitor
    (
      IdCompetitor INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      Points INT NOT NULL,
      Won INT NOT NULL,
      Lost INT NOT NULL,
      IdCompetition INT NOT NULL,
      FOREIGN KEY (IdCompetition) REFERENCES Competition(IdCompetition)
    );`

const sql_create_match =
    `CREATE TABLE Match
    (
      ScoreFirst INT NOT NULL,
      ScoreSecond INT NOT NULL,
      IdMatch INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      Round INT NOT NULL,
      Date DATE NOT NULL,
      Played BOOLEAN NOT NULL,
      IdCompetition INT NOT NULL,
      IdCompetitorFirst INT NOT NULL,
      IdCompetitorSecond INT NOT NULL,
      FOREIGN KEY (IdCompetition) REFERENCES Competition(IdCompetition),
      FOREIGN KEY (IdCompetitorFirst) REFERENCES Competitor(IdCompetitor),
      FOREIGN KEY (IdCompetitorSecond) REFERENCES Competitor(IdCompetitor)
    );`


const sql_insert_userinfo = `INSERT INTO Users(IdUser) VALUES ('google-oauth2|100000000000000000000');`

const sql_insert_competition =
    `INSERT INTO Competition(Name, System, IdUser)
    VALUES ('Competition1', '3/1/0', 'google-oauth2|100000000000000000000');`

const sql_insert_competitor =
    `INSERT INTO Competitor(Name, Points, Won, Lost, IdCompetition)
    VALUES ('Competitor1', 0, 0, 0, 1);
    INSERT INTO Competitor(Name, Points, Won, Lost, IdCompetition)
    VALUES ('Competitor2', 0, 0, 0, 1);`

const sql_insert_match =
    `INSERT INTO Match(ScoreFirst, ScoreSecond, Round, Date, Played, IdCompetition, IdCompetitorFirst, IdCompetitorSecond)
    VALUES (0, 0, 1, '2021-01-01', false, 1, 1, 2)`

let table_names = ['Users', 'Competition', 'Competitor', 'Match']

let tables = [sql_create_userinfo, sql_create_competition, sql_create_competitor, sql_create_match]

let inserts = [sql_insert_userinfo, sql_insert_competition, sql_insert_competitor, sql_insert_match]

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
