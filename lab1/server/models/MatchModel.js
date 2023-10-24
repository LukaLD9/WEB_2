const db = require('../db');

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

}

module.exports = Match;