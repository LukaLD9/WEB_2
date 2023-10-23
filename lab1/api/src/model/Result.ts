import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Competition } from "./Competition";
import { Competitor } from "./Competitor";

@Table({
  tableName: Result.RESULT_TABLE_NAME,
})
export class Result extends Model {
    public static RESULT_TABLE_NAME = "result" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER
    })
    scoreFirst!: number;

    @Column({
        type: DataType.INTEGER
    })
    scoreSecond!: number;

    @Column({
        type: DataType.INTEGER
    })
    round!: number;

    @Column({
        type: DataType.DATE
    })
    date!: Date;


    @ForeignKey(() => Competition)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_competition!: number;

    @ForeignKey(() => Competitor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_competitor_first!: number;

    @ForeignKey(() => Competitor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_competitor_second!: number;




}