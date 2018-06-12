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
import Evaluation from "../evaluations/entity";

@Entity()
export default class Students extends BaseEntity {
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
  image: string;

  @ManyToOne(_ => Batch, batch => batch.students, { eager: false })
  batch: Batch;

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {
    eager: true
  })
  evaluations: Evaluation[];
}
