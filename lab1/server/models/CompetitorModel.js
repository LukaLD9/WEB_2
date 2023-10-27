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


    // get all competitors by competition id and order by points
    // also get the competition name
    static async dbGetAllCompetitorsByCompetitionId(id) {
        const query = ` SELECT competitor.*, competition.name AS competitionName
                        FROM competitor
                        INNER JOIN competition
                        ON competitor.idcompetition = competition.idcompetition
                        WHERE competitor.idcompetition = $1
                        ORDER BY points DESC`;
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }


    static async dbInsertCompetitorWithName(name, idCompetition) {
        const query = "INSERT INTO competitor(name, points, won, lost, draw, idCompetition) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [name, 0, 0, 0, 0, idCompetition];
    
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
    

    // get system of competition
    static async dbGetCompetitionSystem(id) {
        const query = "SELECT system FROM competition WHERE idCompetition = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result[0].system;
    }
    
}

module.exports = Competitor;
