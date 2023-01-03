import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {

  constructor(private trackService: TrackService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
    {name: 'audio', maxCount: 1}
  ]))
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const {picture, audio} = files
    return this.trackService.create(dto, picture[0],  audio[0]);
  };



  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.trackService.getAll();
  };


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  };

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  };

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

}