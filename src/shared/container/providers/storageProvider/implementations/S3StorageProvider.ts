import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import uploadConfig from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(fileName: string, folder: string): Promise<string> {
    const filePath = resolve(uploadConfig.tmpFolder, fileName);

    const fileContent = await fs.promises.readFile(filePath);

    const ContentType = mime.getType(filePath);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: fileName,
        Body: fileContent,
        ACL: "public-read",
        ContentType,
      })
      .promise();

    fs.promises.unlink(filePath);

    return fileName;
  }

  async delete(fileName: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: fileName,
      })
      .promise();
  }
}

export { S3StorageProvider };
