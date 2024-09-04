import { Module } from '@nestjs/common';
import { FaceDetectionService } from './face-detection.service';
import { FaceDetectionController } from './face-detection.controller';

@Module({
  providers: [FaceDetectionService],
  controllers: [FaceDetectionController],
})
export class FaceDetectionModule {}
