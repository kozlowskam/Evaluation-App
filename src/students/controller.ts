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
import Student from "./entity";

@JsonController()
export default class StudentController {
  //@Authorized()
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Student.findOne(id);
  }

  //@Authorized()
  @Get("/students")
  async allStudents() {
    const students = await Student.find();
    return { students };
  }

  //@Authorized()
  @Post("/students")
  @HttpCode(201)
  createStudent(@Body() student: Student) {
    return student.save();
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
