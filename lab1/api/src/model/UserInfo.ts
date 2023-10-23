import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Competition } from "./Competition";

@Table({
    tableName: UserInfo.USER_INFO_TABLE_NAME,
})
export class UserInfo extends Model {
    public static USER_INFO_TABLE_NAME = 'userinfo' as string;
    public static USER_INFO_ID_USER = 'id' as string;

    @Column({
        type: DataType.STRING(255),
        primaryKey: true,
        field: UserInfo.USER_INFO_ID_USER
    })
    id!: string;

    @HasMany(() => Competition)
    competitions!: Competition[];
}