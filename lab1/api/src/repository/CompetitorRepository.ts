import { Competitor } from "../model/Competitor";

interface ICompetitorRepo {
  save(competitor: Competitor): Promise<void>;
  update(competitor: Competitor): Promise<void>;
  delete(competitorId: number): Promise<void>;
  retrieveById(competitorId: number): Promise<Competitor>;
  retrieveAll(): Promise<Competitor[]>;
}

export class CompetitiorRepo implements ICompetitorRepo {

  async save(competitor: Competitor): Promise<void> {
    try {
      await Competitor.create({
        id: competitor.id,
        name: competitor.name,
        points: competitor.points,
        won: competitor.won,
        lost: competitor.lost,
        id_competition: competitor.id_competition
      });
    } catch (error) {
      throw new Error("Failed to create competitor!");
    }
  }
  async update(competitor: Competitor): Promise<void> {
    try {
      const new_competitor = await Competitor.findOne({
        where: {
          id: competitor.id,
        },
      });
      if (!new_competitor) {
        throw new Error("competitor not found!");
      }
        new_competitor.id = competitor.id;
        new_competitor.name = competitor.name;
        new_competitor.points = competitor.points;
        new_competitor.won = competitor.won;
        new_competitor.lost = competitor.lost;
        new_competitor.id_competition = competitor.id_competition;
      await new_competitor.save();
    } catch (error) {
      throw new Error("Failed to create competitor!");
    }
  }
  async delete(competitorId: number): Promise<void> {
    try {
      const new_competitor = await Competitor.findOne({
        where: {
          id: competitorId,
        },
      });
      if (!new_competitor) {
        throw new Error("Competitor not found!");
      }

      await new_competitor.destroy();
    } catch (error) {
      throw new Error("Failed to create competitor!");
    }
  }
  async retrieveById(competitorId: number): Promise<Competitor> {
    try {
      const new_competitor = await Competitor.findOne({
        where: {
          id: competitorId,
        },
      });
      if (!new_competitor) {
        throw new Error("Competitor not found!");
      }
      return new_competitor;
    } catch (error) {
      throw new Error("Failed to create competitor!");
    }
  }
  async retrieveAll(): Promise<Competitor[]> {
    try {
     return await Competitor.findAll();
    } catch (error) {
      throw new Error("Failed to create competitor!");
    }
  }
  
}