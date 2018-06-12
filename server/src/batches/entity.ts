import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import Students from "../students/entity";

@Entity()
export default class Batch extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() inDate: string;

  @Column() endDate: string;

  @OneToMany(_ => Students, student => student.batch, {
    eager: true,
    cascade: true
  })
  students: Students[];
}
