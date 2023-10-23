import BaseRoutes from "./base/BaseRouter";
import UserInfoContoller from "../controller/UserInfoController";
import validate from "../helper/validate";
import { createUserInfoSchema, updateUserInfoSchema } from "../schema/UserInfoSchema";

class UserInfoRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createUserInfoSchema), UserInfoContoller.create);
    this.router.patch(
      "/:id",
      validate(updateUserInfoSchema),
      UserInfoContoller.update
    );
    this.router.delete("/:id", UserInfoContoller.delete);
    this.router.get("", UserInfoContoller.findAll);
    this.router.get("/:id", UserInfoContoller.findById);
  }
}

export default new UserInfoRoutes().router