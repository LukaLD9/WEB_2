import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Competition } from "./Competition";

@Table({
  tableName: Competitor.COMPETITOR_TABLE_NAME,
})
export class Competitor extends Model {
    public static COMPETITOR_TABLE_NAME = "competitor" as string;
    public static COMPETITOR_ID = "id" as string;
    public static COMPETITOR_NAME = "name" as string;
    public static COMPETITOR_POINTS = "points" as string;
    public static COMPETITOR_WON = "won" as string;
    public static COMPETITOR_LOST = "lost" as string;
    public static COMPETITOR_ID_COMPETITION = "id_competition" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Competitor.COMPETITOR_ID,
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        field: Competitor.COMPETITOR_NAME,
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        field: Competitor.COMPETITOR_POINTS,
    })
    points!: number;

    @Column({
        type: DataType.INTEGER,
        field: Competitor.COMPETITOR_WON,
    })
    won!: number;

    @Column({
        type: DataType.INTEGER,
        field: Competitor.COMPETITOR_LOST,
    })
    lost!: number;

    @ForeignKey(() => Competition)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: Competition.COMPETITION_ID,
    })
    id_competition!: number;



}