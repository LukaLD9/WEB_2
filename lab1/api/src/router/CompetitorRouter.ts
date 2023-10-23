import BaseRoutes from "./base/BaseRouter";
import CompetitorContoller from "../controller/CompetitorController";
import validate from "../helper/validate";
import { createCompetitorSchema, updateCompetitorSchema } from "../schema/CompetitorSchema";

class CompetitorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createCompetitorSchema), CompetitorContoller.create);
    this.router.patch(
      "/:id",
      validate(updateCompetitorSchema),
      CompetitorContoller.update
    );
    this.router.delete("/:id", CompetitorContoller.delete);
    this.router.get("", CompetitorContoller.findAll);
    this.router.get("/:id", CompetitorContoller.findById);
  }
}

export default new CompetitorRoutes().router