import { UserInfo } from "../model/UserInfo";

interface IUserInfoRepo {
  save(userInfo: UserInfo): Promise<void>;
  update(userInfo: UserInfo): Promise<void>;
  delete(userInfoId: string): Promise<void>;
  retrieveById(userInfoId: string): Promise<UserInfo>;
  retrieveAll(): Promise<UserInfo[]>;
}

export class UserInfoRepo implements IUserInfoRepo {

  async save(userInfo: UserInfo): Promise<void> {
    try {
      await UserInfo.create({
        id: userInfo.id
      });
    } catch (error) {
      throw new Error("Failed to create userInfo!");
    }
  }
  async update(userInfo: UserInfo): Promise<void> {
    try {
      const new_userInfo = await UserInfo.findOne({
        where: {
          id: userInfo.id,
        },
      });
      if (!new_userInfo) {
        throw new Error("userInfo not found!");
      }
      new_userInfo.id = userInfo.id;

      await new_userInfo.save();
    } catch (error) {
      throw new Error("Failed to create UserInfo!");
    }
  }
  async delete(userInfoId: string): Promise<void> {
    try {
      const new_userInfo = await UserInfo.findOne({
        where: {
          id: userInfoId,
        },
      });
      if (!new_userInfo) {
        throw new Error("UserInfo not found!");
      }

      await new_userInfo.destroy();
    } catch (error) {
      throw new Error("Failed to create userInfo!");
    }
  }
  async retrieveById(userInfoId: string): Promise<UserInfo> {
    try {
      const new_userInfo = await UserInfo.findOne({
        where: {
          id: userInfoId,
        },
      });
      if (!new_userInfo) {
        throw new Error("userInfo not found!");
      }
      return new_userInfo;
    } catch (error) {
      throw new Error("Failed to create userInfo!");
    }
  }
  async retrieveAll(): Promise<UserInfo[]> {
    try {
     return await UserInfo.findAll();
    } catch (error) {
      throw new Error("Failed to create userInfo!");
    }
  }
  
}