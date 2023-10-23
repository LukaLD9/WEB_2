import { Result } from "../model/Result";

interface IResultRepo {
  save(result: Result): Promise<void>;
  update(result: Result): Promise<void>;
  delete(resultId: number): Promise<void>;
  retrieveById(resultId: number): Promise<Result>;
  retrieveAll(): Promise<Result[]>;
}

export class ResultRepo implements IResultRepo {

  async save(result: Result): Promise<void> {
    try {
      await Result.create({
        id: result.id,
        scoreFirst: result.scoreFirst,
        scoreSecond: result.scoreSecond,
        round: result.round,
        date: result.date,
        id_competition: result.id_competition,
        id_competitor_first: result.id_competitor_first,
        id_competitor_second: result.id_competitor_second
      });
    } catch (error) {
      throw new Error("Failed to create result!");
    }
  }
  async update(result: Result): Promise<void> {
    try {
      const new_result = await Result.findOne({
        where: {
          id: result.id,
        },
      });
      if (!new_result) {
        throw new Error("Result not found!");
      }
        new_result.id = result.id;
        new_result.scoreFirst = result.scoreFirst;
        new_result.scoreSecond = result.scoreSecond;
        new_result.round = result.round;
        new_result.date = result.date;
        new_result.id_competition = result.id_competition;
        new_result.id_competitor_first = result.id_competitor_first;
        new_result.id_competitor_second = result.id_competitor_second;

      await new_result.save();
    } catch (error) {
      throw new Error("Failed to create result!");
    }
  }
  async delete(resultId: number): Promise<void> {
    try {
      const new_result = await Result.findOne({
        where: {
          id: resultId,
        },
      });
      if (!new_result) {
        throw new Error("Result not found!");
      }

      await new_result.destroy();
    } catch (error) {
      throw new Error("Failed to create result!");
    }
  }
  async retrieveById(resultId: number): Promise<Result> {
    try {
      const new_result = await Result.findOne({
        where: {
          id: resultId,
        },
      });
      if (!new_result) {
        throw new Error("Result not found!");
      }
      return new_result;
    } catch (error) {
      throw new Error("Failed to create result!");
    }
  }
  async retrieveAll(): Promise<Result[]> {
    try {
     return await Result.findAll();
    } catch (error) {
      throw new Error("Failed to create result!");
    }
  }
  
}