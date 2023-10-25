const db = require('../db');
var Competition = require('./CompetitionModel');


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

    // get competitor by id
    static async dbGetCompetitorById(id) {
        const query = "SELECT * FROM competitor WHERE idCompetitor = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }

    // update competitor
    static async dbUpdateCompetitor(competitor) {
        const query = "UPDATE competitor SET name = $1, points = $2, won = $3, lost = $4, idCompetition = $5 WHERE idCompetitor = $6 RETURNING *";
        const values = [competitor.name, competitor.points, competitor.won, competitor.lost, competitor.idcompetition, competitor.idcompetitor];
        const result = await db.query(query, values);
        return result;
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


    // get system of competition
    static async dbGetCompetitionSystem(id) {
        const query = "SELECT system FROM competition WHERE idCompetition = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result[0].system;
    }

    // update competitor points, won, lost based on match result and competition system
    static async dbUpdateCompetitors(idCompetitor1, idCompetitor2, idCompetition, result) {
        // get competition system
        let system = await Competitor.dbGetCompetitionSystem(idCompetition);
        let systemParts = system.split("/");
        let win = parseInt(systemParts[0]);
        let lose = parseInt(systemParts[1]);
        let draw = parseInt(systemParts[2]);

        if(result === 1){
            // update competitor1
            let competitor1 = await Competitor.dbGetCompetitorById(idCompetitor1);
            competitor1 = competitor1[0];
            competitor1.points += win;
            competitor1.won += 1;
            const result1 = await Competitor.dbUpdateCompetitor(competitor1);

            // update competitor2
            let competitor2 = await Competitor.dbGetCompetitorById(idCompetitor2);
            competitor2 = competitor2[0];
            competitor2.points += lose;
            competitor2.lost += 1;
            const result2 = await Competitor.dbUpdateCompetitor(competitor2);
            return [result1[0], result2[0]];
        } else if(result === 2){
            // update competitor1
            let competitor1 = await Competitor.dbGetCompetitorById(idCompetitor1);
            competitor1 = competitor1[0];
            competitor1.points += lose;
            competitor1.lost += 1;
            const result1 = await Competitor.dbUpdateCompetitor(competitor1);

            // update competitor2
            let competitor2 = await Competitor.dbGetCompetitorById(idCompetitor2);
            competitor2 = competitor2[0];
            competitor2.points += win;
            competitor2.won += 1;
            const result2 = await Competitor.dbUpdateCompetitor(competitor2);
            return [result1[0], result2[0]];
        } else if(result === 0){
            // update competitor1
            let competitor1 = await Competitor.dbGetCompetitorById(idCompetitor1);
            competitor1 = competitor1[0];
            competitor1.points += draw;
            const result1 = await Competitor.dbUpdateCompetitor(competitor1);

            // update competitor2
            let competitor2 = await Competitor.dbGetCompetitorById(idCompetitor2);
            competitor2 = competitor2[0];
            competitor2.points += draw;
            const result2 = await Competitor.dbUpdateCompetitor(competitor2);
            return [result1[0], result2[0]];
        }
    }

    
}

module.exports = Competitor;
