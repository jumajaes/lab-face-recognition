import { Injectable } from '@nestjs/common';
import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';
import { loadImage } from 'canvas';

@Injectable()
export class FaceDetectionService {
    constructor() {
        const { Canvas, Image, ImageData } = canvas;
        faceapi.env.monkeyPatch({ Canvas: Canvas as any, Image: Image as any, ImageData: ImageData as any });
    }

    async detectFaces(imagePath: string) {
        await faceapi.nets.faceLandmark68Net.loadFromDisk('./src/weights')
        await faceapi.nets.tinyFaceDetector.loadFromDisk('./src/weights')
        await faceapi.nets.faceRecognitionNet.loadFromDisk('./src/weights')
        await faceapi.nets.faceExpressionNet.loadFromDisk('./src/weights')
        await faceapi.nets.ssdMobilenetv1.loadFromDisk('./src/weights')
        await faceapi.nets.ageGenderNet.loadFromDisk('./src/weights')

        const img = await loadImage(imagePath);
        console.log(img)


        const detection = await faceapi.detectAllFaces(img as any,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors().withAgeAndGender();
        console.log(detection)

        const imgBD = await loadImage('./src/images/angry.jpg');
        console.log(imgBD)
        const imgReferes = await faceapi.detectAllFaces(imgBD as any,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors().withAgeAndGender();
        console.log(imgReferes)

        const distance = faceapi.euclideanDistance(imgReferes[0].descriptor, detection[0].descriptor);
        console.log(distance)
        return distance;
    }
}

