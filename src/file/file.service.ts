import { Injectable } from '@nestjs/common';

export enum FileType {
  AUDIO = 'audio',
  PICTURE = 'picture'
}


@Injectable()
export class FileService {

  createFile(type: FileType, file) {

  }

  deleteFile(fileName: string) {

  }

}