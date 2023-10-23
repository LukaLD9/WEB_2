import { Model, Table, Column, DataType, ForeignKey, HasMany } from "sequelize-typescript";
import { UserInfo } from "./UserInfo";
import { Competitor } from "./Competitor";

@Table({
  tableName: Competition.COMPETITION_TABLE_NAME,
})
export class Competition extends Model {
    public static COMPETITION_TABLE_NAME = "competition" as string;
    public static COMPETITION_ID = "id" as string;
    public static COMPETITION_NAME = "name" as string;
    public static COMPETITION_SYSTEM = "description" as string;
    

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Competition.COMPETITION_ID,
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        field: Competition.COMPETITION_NAME,
    })
    name!: string;

    @Column({
        type: DataType.STRING(9),
        field: Competition.COMPETITION_SYSTEM,
    })
    system!: string;

    @ForeignKey(() => UserInfo)
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: UserInfo.USER_INFO_ID_USER,
    })
    id_user!: string;

    @HasMany(() => Competitor)
    competitors?: Competitor[];
}