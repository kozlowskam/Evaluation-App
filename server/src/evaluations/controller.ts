import {
  JsonController,
  NotFoundError,
  // BadRequestError,
  Post,
  HttpCode,
  Get,
  Put,
  Body,
  Param,
  Authorized
} from "routing-controllers";
import Evaluations from "./entity";
//import * as request from "superagent";
import Students from "../students/entity";

@JsonController()
export default class EvaluationController {
  @Authorized()
  @Get("/evaluations/:id")
  getEvaluation(@Param("id") id: number) {
    return Evaluations.findOne(id);
  }

  @Authorized()
  @Get("/evaluations")
  async allEvaluations() {
    const evaluations = await Evaluations.find();
    return { evaluations };
  }

  @Authorized()
  @Post("/evaluations")
  @HttpCode(201)
  async createEvaluation(@Body() evaluations: Evaluations) {
    const student = (await Students.findOne(evaluations.students))!;
    evaluations.students = student;
    return evaluations.save();
  }

  @Authorized()
  @Put("/evaluations/:id")
  async updateEvaluation(
    @Param("id") id: number,
    @Body() update: Partial<Evaluations>
  ) {
    const evaluation = await Evaluations.findOne(id);
    if (!evaluation) throw new NotFoundError("Evaluation not found.");

    return Evaluations.merge(evaluation, update).save();
  }
}
