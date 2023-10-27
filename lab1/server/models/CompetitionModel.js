const db = require('../db');
var Competitor = require('./CompetitorModel');
var User = require('./UserModel');

class Competition {
    constructor(
        name = undefined,
        idCompetition = undefined,
        system = undefined,
        idUser = undefined,
    ) {
        this.name = name;
        this.idCompetition = idCompetition;
        this.system = system;
        this.idUser = idUser;
    }
    



    static async dbInsertCompetition(competition) {
        try {
            const query = "INSERT INTO competition(name, system, idUser) VALUES($1, $2, $3) RETURNING *";
            const values = [competition.name, competition.system, competition.idUser];
            const result = await db.query(query, values);
            return result;
        }
        catch (error) {
            console.error("Error inserting competition:", error);
            throw error;
        }
    }

    

    static async dbGetCompetitionsByUserId(id) {
        const query = "SELECT * FROM competition WHERE idUser = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }


    // function to create a competition, competitors and matches with round robin system
    static async dbCreateCompetitionWithCompetitorsAndMatches(competition, competitorNames) {
        // check if user exists, if not insert
        let user = await User.dbCheckUser(competition.idUser);
        console.log("User:", user);

        // insert competition
        let result = await Competition.dbInsertCompetition(competition);
        const idCompetition = result[0].idcompetition;

        // insert competitors
        let competitors = await Competitor.dbInsertCompetitorsNames(competitorNames, idCompetition);
        console.log("Competitors:", competitors);

        // insert matches

        const startDate = new Date();
        
        const matches = [];
        const numCompetitors = competitors.length;

        for (let round = 1; round < numCompetitors; round++) {
            for (let i = 0; i < numCompetitors / 2; i++) {
            const competitor1 = competitors[i][0];
            const competitor2 = competitors[numCompetitors - 1 - i][0];

            // Calculate the date for the match (tomorrow + i weeks)
            const matchDate = new Date(startDate);
            matchDate.setDate(startDate.getDate() + 7 * round);

            // Insert match data into the database
            const query = "INSERT INTO match(scoreFirst, scoreSecond, round, date, played, idCompetition, idCompetitorFirst, idCompetitorSecond) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
            const values = [0, 0, round, matchDate, false, idCompetition, competitor1.idcompetitor, competitor2.idcompetitor];
            const result = await db.query(query, values);
            matches.push(result);
            }
    
            // Rotate competitors array for the next round
            competitors.splice(1, 0, competitors.pop());
        }
    }
}

module.exports = Competition;




