import {
  JsonController,
  //NotFoundError,
  // BadRequestError,
  Post,
  HttpCode,
  Get,
  Body,
  Param
  //Delete,
  //CurrentUser,
  //Authorized
  // HttpError
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

  //@Authorized()
  @Get("/students")
  async allStudents() {
    const students = await Students.find();
    return { students };
  }

  //@Authorized()
  @Post("/students")
  @HttpCode(201)
  async createStudent(@Body() students: Students) {
    const batch = (await Batch.findOne(students.batch))!;
    students.batch = batch;
    return students.save();
  }

  //   @Delete("/students/:id")
  //   async deleteStudent(
  //     @Param('id') id: number
  // ) {
  //     const student = await Student.findOneById(id)

  //     if (!student) throw new NotFoundError('Student not found.')

  //     if (student) Student.removeById(id)
  //     return 'Question Deleted.'
  // }
}
