import BaseRoutes from "./base/BaseRouter";
import CompetitionContoller from "../controller/CompetitionController";
import validate from "../helper/validate";
import { createCompetitionSchema, updateCompetitionSchema } from "../schema/CompetitionSchema";

class CompetitionRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createCompetitionSchema), CompetitionContoller.create);
    this.router.patch(
      "/:id",
      validate(updateCompetitionSchema),
      CompetitionContoller.update
    );
    this.router.delete("/:id", CompetitionContoller.delete);
    this.router.get("", CompetitionContoller.findAll);
    this.router.get("/:id", CompetitionContoller.findById);
  }
}

export default new CompetitionRoutes().router