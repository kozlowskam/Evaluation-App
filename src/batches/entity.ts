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

  @Column() dates: string;

  @OneToMany(_ => Student, student => student.batch)
  students: Student[];
}
