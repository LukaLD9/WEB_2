import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Competition } from "./Competition";
import { Competitor } from "./Competitor";

@Table({
  tableName: Result.RESULT_TABLE_NAME,
})
export class Result extends Model {
    public static RESULT_TABLE_NAME = "result" as string;
    public static RESULT_ID = "id" as string;
    public static RESULT_SCORE_FIRST = "scoreFirst" as string;
    public static RESULT_SCORE_SECOND = "scoreSecond" as string;
    public static RESULT_ROUND = "round" as string;
    public static RESULT_DATE = "date" as string;
    public static RESULT_ID_COMPETITION = "id_competition" as string;
    public static RESULT_ID_COMPETITOR_FIRST = "id_competitor_first" as string;
    public static RESULT_ID_COMPETITOR_SECOND = "id_competitor_second" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Result.RESULT_ID,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        field: Result.RESULT_SCORE_FIRST,
    })
    scoreFirst!: number;

    @Column({
        type: DataType.INTEGER,
        field: Result.RESULT_SCORE_SECOND,
    })
    scoreSecond!: number;

    @Column({
        type: DataType.INTEGER,
        field: Result.RESULT_ROUND,
    })
    round!: number;

    @Column({
        type: DataType.DATE,
        field: Result.RESULT_DATE,
    })
    date!: Date;


    @ForeignKey(() => Competition)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: Competition.COMPETITION_ID,
    })
    id_competition!: number;

    @ForeignKey(() => Competitor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: Competitor.COMPETITOR_ID,
    })
    id_competitor_first!: number;

    @ForeignKey(() => Competitor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: Competitor.COMPETITOR_ID,
    })
    id_competitor_second!: number;




}