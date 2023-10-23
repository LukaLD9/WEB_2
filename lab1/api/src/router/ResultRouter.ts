import BaseRoutes from "./base/BaseRouter";
import ResultContoller from "../controller/ResultController";
import validate from "../helper/validate";

class ResultRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("",  ResultContoller.create);
    this.router.patch(
      "/:id",
      ResultContoller.update
    );
    this.router.delete("/:id", ResultContoller.delete);
    this.router.get("", ResultContoller.findAll);
    this.router.get("/:id", ResultContoller.findById);
  }
}

export default new ResultRoutes().router