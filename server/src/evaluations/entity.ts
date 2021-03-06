import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { IsString, IsIn, IsOptional } from "class-validator";
import Student from "../students/entity";

export type Color = "red" | "yellow" | "green";
const colorArray: Array<Color> = ["red", "yellow", "green"];

@Entity()
export default class Evaluations extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  // @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  // Date: string;

  @IsOptional()
  @UpdateDateColumn({ nullable: true })
  date: Date;

  @ManyToOne(_ => Student, student => student.evaluations, {
    eager: false,
    cascade: true
  })
  student: Student;

  @IsString()
  @IsIn(colorArray)
  @Column("text", { nullable: false })
  color: Color;

  @IsOptional()
  @IsString()
  @Column("text", { default: "no comment", nullable: true })
  comment: string;
}
