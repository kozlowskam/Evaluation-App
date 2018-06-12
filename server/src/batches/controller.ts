import {
  JsonController,
  //NotFoundError,
  // BadRequestError,
  Post,
  HttpCode,
  Get,
  Body,
  Param,
  Authorized
  // HttpError
} from "routing-controllers";
import Batch from "./entity";
//import * as request from "superagent";

@JsonController()
export default class BatchController {
  @Authorized()
  @Get("/batches/:id")
  getBatch(@Param("id") id: number) {
    return Batch.findOne(id);
  }

  @Authorized()
  @Get("/batches")
  async allBatches() {
    const batches = await Batch.find();
    return { batches };
  }

  @Authorized()
  @Post("/batches")
  @HttpCode(201)
  createBatch(@Body() batch: Batch) {
    return batch.save();
  }
}
