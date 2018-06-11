import {
  JsonController,
  //NotFoundError,
  // BadRequestError,
  Post,
  HttpCode,
  Get,
  Body,
  Param
  // HttpError
} from "routing-controllers";
import Evaluation from "./entity";
//import * as request from "superagent";
import Student from "../students/entity";

@JsonController()
export default class EvaluationController {
  //@Authorized()
  @Get("/evaluations/:id")
  getEvaluation(@Param("id") id: number) {
    return Evaluation.findOne(id);
  }

  //@Authorized()
  @Get("/evaluations")
  async allEvaluations() {
    const evaluations = await Evaluation.find();
    return { evaluations };
  }

  //@Authorized()
  @Post("/evaluations")
  @HttpCode(201)
  async createEvaluation(@Body() evaluation: Evaluation) {
    const student = (await Student.findOne(evaluation.student))!;
    evaluation.student = student;
    return evaluation.save();
  }
}
