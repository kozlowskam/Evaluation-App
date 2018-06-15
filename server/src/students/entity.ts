import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { MinLength, IsString } from "class-validator";
import Batch from "../batches/entity";
import Evaluations from "../evaluations/entity";
import { Url } from "url";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  firstName: string;

  @IsString()
  @MinLength(2)
  @Column("text")
  lastName: string;

  @Column("text", { nullable: true })
  image: Url;

  @ManyToOne(_ => Batch, batch => batch.students, {
    eager: false
  })
  batch: Batch;

  @OneToMany(_ => Evaluations, evaluation => evaluation.student, {
    eager: true
    //cascade: true
  })
  evaluations: Evaluations[];
}
