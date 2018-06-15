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
import Student from "./entity";
import Batch from "../batches/entity";

@JsonController()
export default class StudentController {
  //@Authorized()
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Student.findOne(id);
  }

  @Authorized()
  @Get("/students")
  async allStudents() {
    const students = await Student.find();
    return { students };
  }

  @Authorized()
  @Put("/students/:id")
  async updateStudent(
    @Param("id") id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOne(id);
    if (!student) throw new NotFoundError("Student not found.");

    return Student.merge(student, update).save();
  }

  @Authorized()
  @Post("/students")
  @HttpCode(201)
  async createStudent(@Body() student: Student) {
    const batch = (await Batch.findOne(student.batch))!;
    student.batch = batch;
    return student.save();
  }

  //@Authorized()
  @Delete("/students/:id")
  async deleteStudent(@Param("id") id: number) {
    const student = await Student.findOne(id);

    if (!student) throw new NotFoundError("Student not found.");

    if (student) Student.delete(id);
    return "Student Deleted.";
  }
}
