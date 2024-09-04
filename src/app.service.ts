import { Injectable } from '@nestjs/common';

import '@tensorflow/tfjs-node'
import canvas from 'canvas';
import faceapi from 'face-api.js';

const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

@Injectable()
export class AppService {

  
  checkFaceRecognition(): any {

  }
  
}
