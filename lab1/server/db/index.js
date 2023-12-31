const {Pool} = require('pg');
var dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionString: isProduction ? process.env.DB_URL : connectionString,
    ssl: isProduction
});

dangerous_query = async (text, params) => {
    return await pool.query(text, params)
        .then(res => {
            return res;
        });
}

async function query(text, params, throwerr=false){
    try {
        console.log(text)
        const result = await dangerous_query(text, params);
        //console.log(result.rows)
        return result.rows;
    } catch (err) {
        console.error("Error while querying the database:")
        console.log(err);
        if (throwerr)
            throw err
    }
}

module.exports = {
    query: query,
    dangerous_query: dangerous_query,
    pool: pool
}
