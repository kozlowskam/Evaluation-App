import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import Student from "../students/entity";

@Entity()
export default class Batch extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("integer", { nullable: true })
  batchNumber: number;

  @Column("text", { nullable: true })
  inDate: string;

  @Column("text", { nullable: true })
  endDate: string;

  @OneToMany(_ => Student, student => student.batch, {
    eager: true,
    cascade: true
  })
  students: Student[];
}
