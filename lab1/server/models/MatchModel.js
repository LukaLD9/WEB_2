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
    // with name of competition is in match name of competitors is in match and their score is in match, id od match and date
    // also id of user who created match
    static async dbGetAllMatchesByCompetitionId(id) {
        const query = `SELECT match.idmatch, match.date, match.scorefirst, match.scoresecond, match.round,
                        competitor.name AS competitorfirst,
                        competitor2.name AS competitorsecond,
                        competition.name AS competitionname,
                        users.iduser
                        FROM match
                        INNER JOIN competitor ON match.idcompetitorfirst = competitor.idcompetitor
                        INNER JOIN competitor AS competitor2 ON match.idcompetitorsecond = competitor2.idcompetitor
                        INNER JOIN competition ON match.idcompetition = competition.idcompetition
                        INNER JOIN users ON competition.iduser = users.iduser
                        WHERE match.idcompetition = $1 ORDER BY match.date ASC`;
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

    /*
    // return if match was played
    static async dbCheckMatchPlayed(id) {
        const query = "SELECT played FROM match WHERE idMatch = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result[0].played;
    }
    */

    // return result of match
    static async dbGetMatchResult(id) {
        const query = "SELECT scoreFirst, scoreSecond FROM match WHERE idMatch = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result[0];
    }

    static async dbUpdateMatchResult(idMatch, scoreFirst, scoreSecond) {
        //const isDateInPast = await Match.dbCheckMatchDateInPast(idMatch);
       // if(isDateInPast) {
            const query = "UPDATE match SET scoreFirst = $1, scoreSecond = $2, played = true WHERE idMatch = $3 RETURNING *";
            const values = [scoreFirst, scoreSecond, idMatch];
            const result = await db.query(query, values);
            const idCompetition = result[0].idcompetition;
            const idCompetitorFirst = result[0].idcompetitorfirst;
            const idCompetitorSecond = result[0].idcompetitorsecond;

            const result1 = await Match.dbUpdateCompetitorPoints(idCompetitorFirst);
            const result2 = await Match.dbUpdateCompetitorPoints(idCompetitorSecond);
            return [result1[0], result2[0]];
        // } else {
        //     return false;
        // }
    }

    // loop through all matches and update points, won, lost
    // in match he can be competitor1 or competitor2
    static async dbUpdateCompetitorPoints(idCompetitor) {
        let matches = await Match.dbGetAllMatchesByCompetitorId(idCompetitor);
        matches = matches.filter(match => match.played === true);

        const idCompetition = matches[0].idcompetition;
        let system = await Competitor.dbGetCompetitionSystem(idCompetition);
        let systemParts = system.split("/");
        const win = parseInt(systemParts[0]);
        const draw = parseInt(systemParts[1]);
        const lose = parseInt(systemParts[2]);

        let points = 0;
        let won = 0;
        let lost = 0;
        let drawed = 0;

        for (let i = 0; i < matches.length; i++) {
            if(matches[i].idcompetitorfirst == idCompetitor){ 
                // he was first and won
                if(matches[i].scorefirst > matches[i].scoresecond){
                    points += win;
                    won += 1;
                } else if(matches[i].scorefirst < matches[i].scoresecond){
                    points += lose;
                    lost += 1;
                } else {
                    points += draw;
                    drawed += 1;
                }
            } else {
                if(matches[i].scorefirst < matches[i].scoresecond){
                    points += win;
                    won += 1;
                } else if(matches[i].scorefirst > matches[i].scoresecond){
                    points += lose;
                    lost += 1;
                } else {
                    points += draw;
                    drawed += 1;
                }
            }
        }

        const query = "UPDATE competitor SET points = $1, won = $2, lost = $3, draw = $4 WHERE idcompetitor = $5 RETURNING *";
        const values = [points, won, lost, drawed, idCompetitor];
        const result = await db.query(query, values);
        return result;

    }

    
    // get all maches by competitor id, where he is first competitor or second competitor
    static async dbGetAllMatchesByCompetitorId(id) {
        const query = "SELECT * FROM match WHERE idcompetitorfirst = $1 OR idcompetitorsecond = $1";
        const values = [id];
        const result = await db.query(query, values);
        return result;
    }


}

module.exports = Match;