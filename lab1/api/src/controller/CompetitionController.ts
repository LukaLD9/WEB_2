import { Request, Response } from "express";
import { Competition } from "../model/Competition";
import { CompetitionRepo } from "../repository/CompetitionRepository";

class CompetitionController {
  async create(req: Request, res: Response) {
    try {
      const new_competition = new Competition();
        new_competition.name = req.body.name;
        new_competition.system = req.body.system;
        new_competition.id_user = req.body.id_user;
        new_competition.competitors = req.body.competitors;

      await new CompetitionRepo().save(new_competition);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created competition!",
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
      await new CompetitionRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted competition!",
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
      const new_competition = await new CompetitionRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched competition by id!",
        data: new_competition,
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
      const new_competition = await new CompetitionRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all competition data!",
        data: new_competition,
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
      const new_competition = new Competition();

        new_competition.id = id;
        new_competition.name = req.body.name;
        new_competition.system = req.body.system;
        new_competition.id_user = req.body.id_user;
        new_competition.competitors = req.body.competitors;

      await new CompetitionRepo().update(new_competition);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated competition data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new CompetitionController()