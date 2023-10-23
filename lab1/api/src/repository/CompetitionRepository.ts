import { Competition } from "../model/Competition";

interface ICompetitonRepo {
  save(competition: Competition): Promise<void>;
  update(competition: Competition): Promise<void>;
  delete(competitionId: number): Promise<void>;
  retrieveById(competitionId: number): Promise<Competition>;
  retrieveAll(): Promise<Competition[]>;
}

export class CompetitionRepo implements ICompetitonRepo {

  async save(competition: Competition): Promise<void> {
    try {
      await Competition.create({
        id: competition.id,
        name: competition.name,
        system: competition.system,
        id_user: competition.id_user,
        competitors: competition.competitors
      });
    } catch (error) {
      throw new Error("Failed to create competition!");
    }
  }
  async update(competition: Competition): Promise<void> {
    try {
      const new_competition = await Competition.findOne({
        where: {
          id: competition.id,
        },
      });
      if (!new_competition) {
        throw new Error("Competition not found!");
      }
        new_competition.id = competition.id;
        new_competition.name = competition.name;
        new_competition.system = competition.system;
        new_competition.id_user = competition.id_user;
        new_competition.competitors = competition.competitors;

      await new_competition.save();
    } catch (error) {
      throw new Error("Failed to create competition!");
    }
  }
  async delete(competitionId: number): Promise<void> {
    try {
      const new_competition = await Competition.findOne({
        where: {
          id: competitionId,
        },
      });
      if (!new_competition) {
        throw new Error("Competition not found!");
      }

      await new_competition.destroy();
    } catch (error) {
      throw new Error("Failed to create competition!");
    }
  }
  async retrieveById(competitionId: number): Promise<Competition> {
    try {
      const new_competition = await Competition.findOne({
        where: {
          id: competitionId,
        },
      });
      if (!new_competition) {
        throw new Error("Competition not found!");
      }
      return new_competition;
    } catch (error) {
      throw new Error("Failed to create competition!");
    }
  }
  async retrieveAll(): Promise<Competition[]> {
    try {
     return await Competition.findAll();
    } catch (error) {
      throw new Error("Failed to create competition!");
    }
  }
  
}