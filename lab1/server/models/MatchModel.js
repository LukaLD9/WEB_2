const db = require('../db');
var Competitor = require('./CompetitorModel');

class Match {
    constructor(
        idMatch = undefined,
        scoreFirst = undefined,
        scoreSecond = undefined,
        round = undefined,
        date = undefined,
        played = undefined,
        idCompetition = undefined,
        idCompetitorFirst = undefined,
        idCompetitorSecond = undefined
    ) {
        this.idMatch = idMatch;
        this.scoreFirst = scoreFirst;
        this.scoreSecond = scoreSecond;
        this.round = round;
        this.date = date;
        this.played = played;
        this.idCompetition = idCompetition;
        this.idCompetitorFirst = idCompetitorFirst;
        this.idCompetitorSecond = idCompetitorSecond;
    }

    // get all matches
    static async dbGetAllMatches() {
        const query = "SELECT * FROM match";
        const result = await db.query(query);
        return result;
    }


    // get all matches by competition id
    static async dbGetAllMatchesByCompetitionId(id) {
        const query = "SELECT * FROM match WHERE idcompetition = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }

    // update match
    static async dbUpdateMatch(match) {
        const query = "UPDATE match SET scoreFirst = $1, scoreSecond = $2, round = $3, date = $4, played = $5, idCompetition = $6, idCompetitorFirst = $7, idCompetitorSecond = $8 WHERE idMatch = $9 RETURNING *";
        const values = [match.scoreFirst, match.scoreSecond, match.round, match.date, match.played, match.idCompetition, match.idCompetitorFirst, match.idCompetitorSecond, match.idMatch];
        const result = await db.query(query, values);
        return result;
    }

    // return true if match date is in the past
    static async dbCheckMatchDateInPast(id) {
        const query = "SELECT date FROM match WHERE idMatch = $1";
        const values = [id];
        const result = await db.query(query, values);
        if(result[0].date < new Date()) {
            return true;
        }
        return false;
    }

    static async dbUpdateMatchResult(idMatch, scoreFirst, scoreSecond) {
        const isDateInPast = await Match.dbCheckMatchDateInPast(idMatch);
        if(isDateInPast) {
            const query = "UPDATE match SET scoreFirst = $1, scoreSecond = $2, played = true WHERE idMatch = $3 RETURNING *";
            const values = [scoreFirst, scoreSecond, idMatch];
            const result = await db.query(query, values);
            const idCompetition = result[0].idcompetition;
            const idCompetitorFirst = result[0].idcompetitorfirst;
            const idCompetitorSecond = result[0].idcompetitorsecond;
            if(scoreFirst > scoreSecond) { // 1
                return await Competitor.dbUpdateCompetitors(idCompetitorFirst, idCompetitorSecond, idCompetition, 1);
            } else if(scoreFirst < scoreSecond) { // 2
                return await Competitor.dbUpdateCompetitors(idCompetitorFirst, idCompetitorSecond, idCompetition, 2);
            } else { // x
                return await Competitor.dbUpdateCompetitors(idCompetitorFirst, idCompetitorSecond, idCompetition, 0);
            }
        } else {
            return false;
        }
    }

}

module.exports = Match;