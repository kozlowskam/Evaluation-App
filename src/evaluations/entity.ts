import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { IsString, IsIn } from "class-validator";
import Student from "../students/entity";

export type Color = "red" | "yellow" | "green";
const colorArray: Array<Color> = ["red", "yellow", "green"];

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  Date: string;

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student;

  @IsString()
  @IsIn(colorArray)
  @Column("text", { nullable: false })
  color: Color;
}
