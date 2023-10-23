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
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING(255)
    })
    name!: string;

    @Column({
        type: DataType.STRING(9)
    })
    system!: string;

    @ForeignKey(() => UserInfo)
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    id_user!: string;

    @HasMany(() => Competitor)
    competitors?: Competitor[];
}