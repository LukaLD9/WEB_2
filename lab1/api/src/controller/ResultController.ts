import { Request, Response } from "express";
import { Result } from "../model/Result";
import { ResultRepo } from "../repository/ResultRepository";

class ResultController {
  async create(req: Request, res: Response) {
    try {
      const new_result = new Result();
        new_result.id = req.body.id;
        new_result.scoreFirst = req.body.scoreFirst;
        new_result.scoreSecond = req.body.scoreSecond;
        new_result.round = req.body.round;
        new_result.date = req.body.date;
        new_result.id_competition = req.body.id_competition;
        new_result.id_competitor_first = req.body.id_competitor_first;
        new_result.id_competitor_second = req.body.id_competitor_second;

      await new ResultRepo().save(new_result);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created resnew_result!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new ResultRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted resnew_result!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_result = await new ResultRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched resnew_result by id!",
        data: new_result,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_result = await new ResultRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all resnew_result data!",
        data: new_result,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_result = new Result();

        new_result.id = id;
        new_result.scoreFirst = req.body.scoreFirst;
        new_result.scoreSecond = req.body.scoreSecond;
        new_result.round = req.body.round;
        new_result.date = req.body.date;
        new_result.id_competition = req.body.id_competition;
        new_result.id_competitor_first = req.body.id_competitor_first;
        new_result.id_competitor_second = req.body.id_competitor_second;

      await new ResultRepo().update(new_result);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated resnew_result data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new ResultController()