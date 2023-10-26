const db = require('../db');

class User {
    constructor(
        iduser = undefined,
    ) {
        this.iduser = idzser;
    }

    // check if user exists, if not insert
    static async dbCheckUser(id) {
        const query = "SELECT * FROM users WHERE iduser = $1";
        const values = [id];
        const result = await db.query(query, values);
        if (result.length === 0) {
            console.log("User does not exist, inserting...");
            const query = "INSERT INTO users(iduser) VALUES($1) RETURNING *";
            const values = [id];
            const result = await db.query(query, values);
            return result;
        }
        return result;
    }

}

module.exports = User;