import {
  JsonController,
  NotFoundError,
  Post,
  HttpCode,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Authorized
} from "routing-controllers";
import Students from "./entity";
import Batch from "../batches/entity";

@JsonController()
export default class StudentController {
  //@Authorized()
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Students.findOne(id);
  }

  @Authorized()
  @Get("/students")
  async allStudents() {
    const students = await Students.find();
    return { students };
  }

  @Authorized()
  @Put("/students/:id")
  async updateStudent(
    @Param("id") id: number,
    @Body() update: Partial<Students>
  ) {
    const student = await Students.findOne(id);
    if (!student) throw new NotFoundError("Student not found.");

    return Students.merge(student, update).save();
  }

  @Authorized()
  @Post("/students")
  @HttpCode(201)
  async createStudent(@Body() students: Students) {
    const batch = (await Batch.findOne(students.batch))!;
    students.batch = batch;
    return students.save();
  }

  @Authorized()
  @Delete("/students/:id")
  async deleteStudent(@Param("id") id: number) {
    const student = await Students.findOne(id);

    if (!student) throw new NotFoundError("Student not found.");

    if (student) Students.delete(id);
    return "Question Deleted.";
  }
}
