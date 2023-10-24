import { Request, Response } from "express";
import { UserInfo } from "../model/UserInfo";
import { UserInfoRepo } from "../repository/UserInfoRepository";

class UserInfoController {
  async create(req: Request, res: Response) {
    try {
      const new_userInfo = new UserInfo();
      new_userInfo.id = req.body.id;

      await new UserInfoRepo().save(new_userInfo);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created userInfo!",
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
      let id = req.params["id"];
      await new UserInfoRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted userInfo!",
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
      let id = req.params["id"];
      const new_userInfo = await new UserInfoRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched userInfo by id!",
        data: new_userInfo,
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
      const new_userInfo = await new UserInfoRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all userInfo data!",
        data: new_userInfo,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
        error: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = req.params["id"];
      const new_userInfo = new UserInfo();

      new_userInfo.id = id;

      await new UserInfoRepo().update(new_userInfo);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated userInfo data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new UserInfoController()