import { Module } from '@nestjs/common';
import { FaceDetectionModule } from './face-detection.module';

@Module({
  imports: [FaceDetectionModule],
})
export class AppModule {}
