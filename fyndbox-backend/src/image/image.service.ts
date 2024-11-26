import { Injectable, Scope } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class ImageService {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Generate a unique file name using UUID and original file name
    const fileName = `${uuid()}-${file.originalname}`;

    // Prepare S3 upload parameters
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload the image to the S3 bucket
    const uploadResult = await this.s3.upload(params).promise();

    // Return the URL of the uploaded image
    return uploadResult.Location;
  }

  async deleteImage(key: string): Promise<void> {
    // Prepare S3 upload parameters
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: key,
    };
    await this.s3.deleteObject(params).promise();
  }
}
