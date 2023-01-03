import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/tracks')
export class TrackController {

  constructor(private trackService: TrackService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
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