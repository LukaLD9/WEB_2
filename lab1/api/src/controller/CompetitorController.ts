import { Request, Response } from "express";
import { Competitor } from "../model/Competitor";
import { CompetitiorRepo } from "../repository/CompetitorRepository";

class CompetitorController {
  async create(req: Request, res: Response) {
    try {
      const new_competitor = new Competitor();
        new_competitor.name = req.body.name;
        new_competitor.points = req.body.points;
        new_competitor.won = req.body.won;
        new_competitor.lost = req.body.lost;
        new_competitor.id_competition = req.body.id_competition;

      await new CompetitiorRepo().save(new_competitor);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created competitor!",
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
      await new CompetitiorRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted competitor!",
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
      const new_competitor = await new CompetitiorRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched competitor by id!",
        data: new_competitor,
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
      const new_competitor = await new CompetitiorRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all competitor data!",
        data: new_competitor,
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
      const new_competitor = new Competitor();

        new_competitor.id = id;
        new_competitor.name = req.body.name;
        new_competitor.points = req.body.points;
        new_competitor.won = req.body.won;
        new_competitor.lost = req.body.lost;
        new_competitor.id_competition = req.body.id_competition;


      await new CompetitiorRepo().update(new_competitor);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated competitor data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new CompetitorController()