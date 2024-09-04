import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FaceDetectionService } from './face-detection.service';

@Controller('detect')
export class FaceDetectionController {
  constructor(private readonly faceDetectionService: FaceDetectionService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './src/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
        return cb(new Error('Only JPG files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async detectFaces(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
    const file = files[0]; 
    console.log(file);
    const detections = await this.faceDetectionService.detectFaces(file.path);
    return detections;
  }
}
