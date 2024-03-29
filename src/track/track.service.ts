import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './shemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './shemas/comments.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';


@Injectable()
export class TrackService {

  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {
  }

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const track = await this.trackModel.create({ ...dto, listen: 0 });
    return track;
  };

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  };

  async getOne(id: ObjectId): Promise<Track> {
    const selectedTrack = await this.trackModel.findById(id).populate('comments');
    return selectedTrack;
  };

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track.id;
  };

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

}