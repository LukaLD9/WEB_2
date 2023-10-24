const db = require('../db');

class Competitor {
    constructor(
        idCompetitor = undefined,
        name = undefined,
        points = undefined,
        won = undefined,
        lost = undefined,
        idCompetition = undefined
    ) {
        this.idCompetitor = idCompetitor;
        this.name = name;
        this.points = points;
        this.won = won;
        this.lost = lost;
        this.idCompetition = idCompetition;
    }


    static async dbGetAllCompetitorsByCompetitionId(id) {
        const query = "SELECT * FROM competitor WHERE idcompetition = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }

    // insert competitor
    static async dbInsertCompetitor(competitor) {
        const query = "INSERT INTO competitor(name, points, won, lost, idCompetition) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [competitor.name, competitor.points, competitor.won, competitor.lost, competitor.idCompetition];
        const result = await db.query(query, values);
        return result;
    }

    static async dbInsertCompetitorWithName(name, idCompetition) {
        const query = "INSERT INTO competitor(name, points, won, lost, idCompetition) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [name, 0, 0, 0, idCompetition];
    
        try {
            const result = await db.query(query, values);
            return result;
        } catch (error) {
            console.error("Error inserting competitor:", error);
            throw error;
        }
    }
    
    static async dbInsertCompetitorsNames(names, idCompetition) {
        const competitors = [];
        for (let i = 0; i < names.length; i++) {
            try {
                let result = await Competitor.dbInsertCompetitorWithName(names[i], idCompetition);
                competitors.push(result);
            } catch (error) {
                console.error("Error inserting competitor with name", names[i], "Error:", error);
            }
        }
        return competitors;
    }

    
}

module.exports = Competitor;
